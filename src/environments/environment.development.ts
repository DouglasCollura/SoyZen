const urlActually = location.origin;
let apiurl


if (urlActually === 'https://front-dev.soyzen.com') {

apiurl='https://api-dev.soyzen.com/api/v1'

} else if (urlActually === 'https://front-qa.soyzen.com') {

apiurl='https://api-qa.soyzen.com/api/v1'

} else{
  apiurl='https://api-qa.soyzen.com/api/v1'

}
export const environment  = {
  production: false,

  apiUrl: apiurl,
  urlMedia: 'https://dev-media.soyzen.com/'

};
// Export 'environment'

