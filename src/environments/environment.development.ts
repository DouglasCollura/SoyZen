const urlActually = location.origin;
let apiurl;

if (urlActually === "https://front-dev.soyzen.com") {
  apiurl = "https://api-dev.soyzen.com/api/v1";
} else if (urlActually === "https://front-qa.soyzen.com") {
  apiurl = "https://api-qa.soyzen.com/api/v1";
} else if (urlActually === "https://front-prod.soyzen.com") {
  apiurl = "https://api.soyzen.com/api/v1";
} else if(urlActually === "https://soyzen.com"){
  apiurl = "https://api.soyzen.com/api/v1"; 
} else if(urlActually === "http://localhost:4200"){
  apiurl = "https://api-qa.soyzen.com/api/v1"; 
} else {
  apiurl = "https://api-qa.soyzen.com/api/v1";
}
export const environment = {
  production: false,



  // apiUrl: "http://localhost:3001/api/v1",

  apiUrl: apiurl,
  urlMedia: "https://dev-media.soyzen.com/",
};
// Export 'environment'
