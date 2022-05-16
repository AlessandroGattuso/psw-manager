document.getElementById("cp_btn").addEventListener("click", Copy);
document.getElementById("generatePsw").addEventListener("click", generatePassword);

function Copy(){
    const copyText = document.getElementById('password-generator')
    copyText.select();
    document.execCommand('copy')
}

function generatePassword() {

  const length = document.getElementById('lenght-textbox').value;
  const minNumbers = document.getElementById('min-numbers').value;
  const minSpecials = document.getElementById('min-specials').value;

  let charset = "";

  const a_z = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const A_Z = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const S_chars = "!@$%&"; 
  const ambiguousChars = "^§()*/^#";

  if(document.getElementById('a-z').checked)
        charset += a_z;
  

  if(document.getElementById('a-z-uppercase').checked)
        charset += A_Z ;
  

  if(document.getElementById('special-chars').checked)
        charset += S_chars ;
  

  if(document.getElementById('numbers').checked)
        charset += numbers;
  
  if(!(document.getElementById('ambiguous-chars').checked))
        charset += ambiguousChars;
    

  let result = "";
  let i = 0;
  const n = charset.length

  for (; i < length; ++i) {
    result += charset.charAt(Math.floor(Math.random() * n));
  }

  let checkNumbers = result.match(/\d/g)?.length || 0;
  let checkSpecials = result.match(/[!@#$%^&*]/g)?.length || 0;
  console.log(checkSpecials)

  let j;
  let char;
  while(checkNumbers < minNumbers){

      i = Math.floor(Math.random() * result.length);
      j = result.charAt(i);

      if(!(j.match(/\d/g))){
        char = numbers.charAt(Math.floor(Math.random() * numbers.length));
        result = setCharAt(result, i, char);
      }

      checkNumbers = result.match(/\d/g)?.length || 0;

  }

  while(checkSpecials < minSpecials){

      i = Math.floor(Math.random() * result.length);
      j = result.charAt(i);
      

      if(!(j.match(/[!@#$%^&*]/g))){
        char = S_chars.charAt(Math.floor(Math.random() * S_chars.length));
        result = setCharAt(result, i, char);
      }

      checkSpecials = result.match(/[!@#$%^&*]/g)?.length || 0;

  }

  document.getElementById('password-generator').value = result;

}

function setCharAt(str,index,chr) {
  if(index > str.length-1) return str;
  return str.substring(0,index) + chr + str.substring(index+1);
}