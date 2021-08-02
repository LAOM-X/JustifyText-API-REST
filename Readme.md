INSTALLATION DE L'API

1) Télécharger le repo, lien :https://github.com/LAOM-X/JustifyText-API-REST.git

2) Installer les packages:
npm install

3) Lancer le serveur:
npm start




TEST DE JUSTIFICATION D'UN TEXTE
Toutes les requêtes sont en post
1)Générer un token soit :
   -En utilisant l'endpoint api/token (https://justify-restapi.herokuapp.com/api/token)
	 {
	"email":"foo@bar.com",
	"password":"1234567"
	}
   -En créant un nouvel utilisateur avec l'endpoint api/register (https://justify-restapi.herokuapp.com/api/register)
	{
	"email":"exemple@bar.com",
	"password":"1234567"
	}
	puis générer un token avec api/token

2) Avec le token récupéré, utiliser l'endpoint api/justify (https://justify-restapi.herokuapp.com/api/justify) et dans l'onglet headers remplissez comme suit:

Key		Value
Content-Type	text/plain
Authorization	"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTA3ZmViODI4OTZjMzdhOGRkMDUyMjciLCJpYXQiOjE2Mjc5MTM5NTh9.FTO6FLlf_VeROWH5lRKCpkL-6b8Meh3tJ_UEa-gv8E0"

N.B: Ajoutez "Bearer " devant le token récupéré

3) Enfin, entrez votre texte a justifié. 
