DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'category') THEN
            CREATE TABLE public.category (id SERIAL PRIMARY KEY NOT NULL, name character varying(255));
            INSERT INTO public.category (name) VALUES ('IT');
            INSERT INTO public.category (name) VALUES ('Casa');
            INSERT INTO public.category (name) VALUES ('Libri');
            INSERT INTO public.category (name) VALUES ('Videogiochi e Console');
            INSERT INTO public.category (name) VALUES ('Alimentari');
            INSERT INTO public.category (name) VALUES ('Salute');
            INSERT INTO public.category (name) VALUES ('Sport');
            RAISE NOTICE 'category table created and data inserted successfully.';
    ELSE
        RAISE NOTICE 'category table already exists, skipping creation and data insertion.';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'supplier') THEN
        CREATE TABLE public.supplier (id SERIAL PRIMARY KEY NOT NULL, contact_email character varying(255), contact_name character varying(255), name character varying(255), phone_number character varying(255));
        INSERT INTO public.supplier (contact_email, contact_name, name, phone_number) VALUES ('john.doe@hp.com', 'John Doe', 'HP', '+17825497631');
        INSERT INTO public.supplier (contact_email, contact_name, name, phone_number) VALUES ('charlie.johnson@amazon.com', 'Charlie Johnson', 'Amazon', '+18562177008');
        INSERT INTO public.supplier (contact_email, contact_name, name, phone_number) VALUES ('joyce.ortiz@pearson.com', 'Joyce Ortiz', 'Pearson', '+17194866719');
        INSERT INTO public.supplier (contact_email, contact_name, name, phone_number) VALUES ('archie.wilbanks@sony.com', 'Archie Wilbanks', 'Sony', '+17194277412');
        INSERT INTO public.supplier (contact_email, contact_name, name, phone_number) VALUES ('corinne.greer@walmart.com', 'Corinne Greer', 'Walmart', '+12019561537');
        INSERT INTO public.supplier (contact_email, contact_name, name, phone_number) VALUES ('benedetta.conti@menarini.it', 'Benedetta Conti', 'Menarini', '+3903235442171');
        INSERT INTO public.supplier (contact_email, contact_name, name, phone_number) VALUES ('michele.mazzanti@decathlon.it', 'Michele Mazzanti', 'Decathlon', '+3903890514170');
        RAISE NOTICE 'supplier table created and data inserted successfully.';
    ELSE
        RAISE NOTICE 'supplier table already exists, skipping creation and data insertion.';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product') THEN
        CREATE TABLE public.product (id SERIAL PRIMARY KEY NOT NULL, name character varying(255), price double precision, stock_quantity integer, category_id bigint, supplier_id bigint, FOREIGN KEY (category_id) REFERENCES category(id), FOREIGN KEY (supplier_id) REFERENCES supplier(id));
        INSERT INTO public.product (name, price, stock_quantity, category_id, supplier_id) VALUES ('Computer', '499.90', '10', '1', '1');
        INSERT INTO public.product (name, price, stock_quantity, category_id, supplier_id) VALUES ('Alexa', '39.90', '50', '2', '2');
        INSERT INTO public.product (name, price, stock_quantity, category_id, supplier_id) VALUES ('Playstation 5', '499.90', '100', '4', '4');
        RAISE NOTICE 'product table created and data inserted successfully.';
    ELSE
        RAISE NOTICE 'product table already exists, skipping creation and data insertion.';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'image') THEN
        CREATE TABLE public.image (id SERIAL PRIMARY KEY NOT NULL, name character varying(255), image_link character varying(255), product_id bigint, FOREIGN KEY (product_id) REFERENCES product(id));
        RAISE NOTICE 'image table created.';
    ELSE
        RAISE NOTICE 'image table already exists, skipping creation.';
    END IF;
END $$;