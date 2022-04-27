
  document.getElementById("form-id").addEventListener("submit", (event)=>{event.preventDefault();});
  document.getElementById("form-id").addEventListener("submit", sendToServer);

  async function sendToServer(){
    const masterPassword = document.getElementById('masterPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if(masterPassword === confirmPassword){

      //location.href('/email-verification');
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('email').value;
      const data = {firstName, lastName, email, masterPassword}
      const options = {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
        },
        status: 200,
        body: JSON.stringify(data)
      }
 
      fetch('/sign-up', options);
     
    }
    else{
      alert(`The passwords don't match`);
    }
  }
