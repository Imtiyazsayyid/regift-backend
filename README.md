# steps to run locally

requirements: Node v18.18.2

open terminal and run:
1. `git clone https://github.com/Imtiyazsayyid/regift-backend.git`
2. `npm i`
3. Create `.env` file in main folder and add the following (NOTE: these contain database credentials and are only added here from the contest):

  `DATABASE_URL=''` -> this field cannot be shared as it contains credentials that when detected by planet-scale resets the credentials.

  `ENCRYPT_KEY="95c530a5f60879594e878ad671339eb19164c78ff15214c4d2b7e9445ec3e9ba"`
  `ENCRYPT_IV="fef81079c52360f6374a974f5f03bb43"`
  
  `JWT_ACCESS_SECRET="793472e6d8d22a64acc569f0b761b3aaf5e039ef"`
  `JWT_ACCESS_TOKEN_EXPIRE="1d"`
  `JWT_REFRESH_SECRET="4334df97fc28724451dd91bdbc1e6d9534506167"`
  `JWT_REFRESH_TOKEN_EXPIRE="10d"`
  
  `EMAIL="imtiyazsayyidwork@gmail.com"`
  `EMAIL_PASS="hiqwijwmrildtnix"`

    
    
5. `npm run dev`

It should run.

NOTE:

The database is hosted using PlanetScale - https://planetscale.com/)https://planetscale.com/ .

The latency may cause api requests to fail due to timeout issues as it is hosted on a Mumbai, India Server.

The public backend url is https://regift-backend.vercel.app/ as it does not run locally without the database url
