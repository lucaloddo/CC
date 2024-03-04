const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const { Dropbox } = require('dropbox');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const dropbox = new Dropbox({ 
  clientId: process.env.DROPBOX_CLIENT_ID,
  clientSecret: process.env.DROPBOX_CLIENT_SECRET,
  refreshToken: process.env.DROPBOX_REFRESH_TOKEN
});


app.post('/process-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image file uploaded');
  }

  sharp(req.file.buffer)
    .resize({ width: 200, height: 200 })
    .toBuffer()
    .then(async (processedImage) => {

      const fileName =`${Date.now()}_processed.jpg`

      const uploadResponse = await dropbox.filesUpload({
        path: `/processed_images/${fileName}`,
        contents: processedImage,
      });

      const sharedLinkResponse = await dropbox.sharingCreateSharedLink({
        path: uploadResponse.result.path_display,
      });

      res.status(200).json({
        imageName: fileName,
        sharedLink: sharedLinkResponse.result.url
      })
    })
    .catch((err) => {
      console.error('Error processing image:', err);
      res.status(500).send('Error processing image');
    });
});

app.get('/list-files', async (req, res) => {
  const folderPath = req.query.folder || '/processed_images'; //
  try {
    const listFilesResponse = await dropbox.filesListFolder({ path: folderPath, recursive: false });
    const files = await Promise.all(listFilesResponse.result.entries
      .filter(entry => entry['.tag'] === 'file')
      .map(async entry => {
        if (entry.name.match(/\.(jpeg|jpg|gif|png|bmp)$/i)) {
          try {
            const sharedLinkResponse = await dropbox.sharingListSharedLinks({ path: entry.path_display });
            if (sharedLinkResponse.result.links.length > 0) {
              return {
                name: entry.name,
                path: entry.path_display,
                isFolder: false,
                sharedLink: sharedLinkResponse.result.links[0].url
              };
            } else {
              const newSharedLinkResponse = await dropbox.sharingCreateSharedLinkWithSettings({ 
                path: entry.path_display,
                settings: { requested_visibility: { '.tag': 'public' } } // Set visibility to public
              });
              return {
                name: entry.name,
                path: entry.path_display,
                isFolder: false,
                sharedLink: newSharedLinkResponse.result.url
              };
            }
          } catch (error) {
            console.error('Error listing shared links:', error);
            return {
              name: entry.name,
              path: entry.path_display,
              isFolder: false,
              sharedLink: null
            };
          }
        } else {
          return {
            name: entry.name,
            path: entry.path_display,
            isFolder: false,
            sharedLink: null
          };
        }
      }));
    res.status(200).json(files);
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).send('Error listing files');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
