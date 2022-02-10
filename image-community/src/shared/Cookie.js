const getCookie = (name) => {
  let value = "; "+document.cookie;

  let parts = value.split(`; ${name}=`); 
  
  // aa=xx; user_id=aaa;  => aa=xx (버리는거) / aaa; (여기서 ; 앞에값 가져오기)
  // pop - 배열 맨끝 떼어오기, shoft 배열 맨 처음 떼오기 
  if(parts.length === 2){
    return parts.pop().split(";").shift();

  }
};

const setCookie = (name, value, exp=5) => {
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
}


const deleteCookie = (name) => {
  let date = new Date("2020-01-08").toUTCString();

  console.log(date);

  document.cookie = name+"=; expires="+date
}

export {getCookie, setCookie, deleteCookie};