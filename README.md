*Global Online Democracy - Delib App*

Delib is a PWA for deliberative and democratic decision making, which was created with the help of [Deliberative Democracy Institute](http://delib.org), for [Global Online Democracy Movement](https://www.globalonlinedemocracy.org/).

The current version is 4. The previous version code can be found here ([Delib-3](https://github.com/talyaron/delib).)

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

In the client directory add a file ```env.ts``` and write the cloudanry key you got from cloudinary.com:
```
export const CLOUDINARY_API='cloudanry_key';
```

**Run**

Run local mongodb local server

in root run ```npm run tsc```

in root run ```npm run dev```

in client run ```npm start```

**Contributers**

***UX/UI***

Daniell Rechter & Rotem Bonder - design the first simple onboarding and suggestions
