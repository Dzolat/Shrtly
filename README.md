# **Shrtly, the simplest link shortener.**

## **Project**

The entire project is based upon **Next.js**, so **react** for the frontend, **Node.js** for the backend.

## **AI usage**

AI was used for the **design** of the components: `Output.tsx`, `InputForm.tsx`, `CustomInputForm.tsx`, as well as the route of `/manage/[slug]`

AI was **NOT** used for anything in the backend, that is the functionality, API routes, lib, and SQL, as well as anything else.

## **Database**

The SQL runs on a PostgreSQL server that's using the **Neon Platform**, the schema is
```sql
CREATE TABLE links (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    short_url TEXT NOT NULL UNIQUE,
    long_url TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

The id is a PRIMARY KEY, that AUTOINCREMENTS.
The short_url is the url that is written after the /s route.
The long_url is the url where the short_url redirects to.

## **Routes**

### **`/`**

The `/` route, shown in `/app/page.tsx`, consists of a history tab, a input form a input form where u can choose your own custom slug. As well as a form where u can input a manage slug, and it will take you there.

### **`/api/shorten`**

The `/api/shorten` route, shown in `/app/api/shorten/route.ts` will shorten your URL, it generates a short url (if there isnt already one) and has error validation.

### **`/manage/[slug]`**

The `/manage/[slug]` route, shown in `/app/api/manage/[slug]/page.tsx` will let you see the long url of the short url you've input, as well as see a QR code.

### **`/s/[slug]`**

The `/s/[slug]` route is what redirects you to the long pages, using.

## **Validation**

The validations check for **1-32 character slugs** (server sided), **HTTP/HTTPS urls only**, theres a `.env` that u have to create, and thats the one below, its from **Neon**

```env
DATABASE_URL="insert_here"
```

## **Design**

I tried making the design as minimal as possible, I wanted this to be simple, lightweight, and easy to understand, which I think I succeeded in.