class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }
  
  getFullList = () => {
    axios.get(this.BASE_URL + `/characters`)
      .then(res => {
        let result = res.data;
        // console.log(result);
        return result;   
      })
      .then(res => {
        const caractContainer = document.querySelector('.characters-container');
        caractContainer.innerHTML = ""; 
        res.forEach(elem => {
          let div = document.createElement('div')
          div.classList.add('character-info')
          div.innerHTML = `
          <div class="id">Id: ${elem.id}</div>
          <div class="name">Name: ${elem.name}</div>
          <div class="occupation">Occupation: ${elem.occupation}</div>
          <div class="cartoon">Is a Cartoon?: ${elem.cartoon}</div>
          <div class="weapon">Character Weapon: ${elem.weapon}</div>        
          `
          caractContainer.appendChild(div);       
          
        });
      })
      .catch(err => console.error(err))    
      
    }
    
    
  
  getOneRegister = () => {
    let id = document.querySelector('.operation input[name="character-id"]').value;
    axios.get(this.BASE_URL + '/characters/' + id)
      .then(res => {
        let result = res.data
        return result;
      })
      .then(result => {
        const caractContainer = document.querySelector('.characters-container');
        caractContainer.innerHTML= '';
        let div = document.createElement('div')
        div.classList.add('character-info')
        div.innerHTML= `
        <div class="id">Id: ${result.id}</div>
        <div class="name">Name: ${result.name}</div>
        <div class="occupation">Occupation: ${result.occupation}</div>
        <div class="cartoon">Is a Cartoon?: ${result.cartoon}</div>
        <div class="weapon">Character Weapon: ${result.weapon}</div>        
        `
        caractContainer.appendChild(div);
        
      })      
      .catch(err => {
        console.error(err)
      });
                
  }
  
  createOneRegister = () => {
    let name = document.querySelector('#new-character-form input[name="name"]').value;
    let occupation = document.querySelector('#new-character-form input[name="occupation"]').value;
    let weapon = document.querySelector('#new-character-form input[name="weapon"]').value;
    let cartoon = document.querySelector('#new-character-form input[name="cartoon"]').value;
            
    axios 
      .post(this.BASE_URL+'/characters', {
        name,
        occupation,
        weapon,
        cartoon
      })
      .then((result)=>{
        document.querySelector('#new-character-form input[name="name"]').value="";
        document.querySelector('#new-character-form input[name="occupation"]').value="";
        document.querySelector('#new-character-form input[name="weapon"]').value="";
        document.querySelector('#new-character-form input[name="cartoon"]').value="";
          
      })
      .catch(err => console.log(err));              
    };
  
  updateOneRegister () {
    
    let id = document.querySelector('#edit-character-form input[name="chr-id"]').value;

    let name = document.querySelector('#edit-character-form input[name="name"]').value;
    let occupation = document.querySelector('#edit-character-form input[name="occupation"]').value;
    let weapon = document.querySelector('#edit-character-form input[name="weapon"]').value;
    let cartoon = document.querySelector('#edit-character-form input[name="cartoon"]').value;

    axios.patch(this.BASE_URL+'/characters/'+id, {
      name, 
      occupation,
      weapon,
      cartoon
    })
    .then((res) => {
      document.querySelector('#edit-character-form input[name="name"]').value="";
      document.querySelector('#edit-character-form input[name="occupation"]').value="";
      document.querySelector('#edit-character-form input[name="weapon"]').value="";
      document.querySelector('#edit-character-form input[name="cartoon"]').value=""
    })
    .catch(err => console.error(err))


  }
  
  deleteOneRegister () {
      let id = document.querySelector('.operation input[name="character-id-delete"]').value;
    axios.delete(this.BASE_URL + '/characters/' + id)
      .then(res => {
        return console.log(res.data)
      })
      .catch(err => console.error(err));
            
        
  }
}
