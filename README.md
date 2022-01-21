*Global Online Democracy*

**Install**

in root run ```npm i```

in ```/client``` run  ```npm i```

In the root directory add ```.env``` file.

use the following configuration:
```
GOOGLE_CLIENT_ID=<>
GOOGLE_CLIENT_SECRET=<>

PASSPORT_SECRET=<>

JWT_SECRET=<>

CLOUDINARY_PAAS=<>

```

In the client directory add a file ```env.ts``` and write the cloudenry key you got from cloudinary.com:
```
export const CLOUDINARY_API='cloudenry_key';
```

**Run**

Run local mongodb local server

in root run ```npm run tsc```

in root run ```npm run dev```

in client run ```npm start```

**Contributers**

***UX/UI***

Daniell Rechter & Rotem Bonder - design the first simple onboarding and suggestions
