function viewIncident(id){
  let myForm = document.getElementById('myForm');
  fetch('http://127.0.0.1:5000/api/v3/user/red-flags/' + id, {
    method: 'GET',
      mode: "cors",
    headers:{
      'content-type':'application/json'
    }
  }).then(function(response) {
      if (response.status === 404) {
        response.json().then((data) => 
          messageError.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("messageError").style.display = "none";
          }, 1000);  
      }
      if (response.status === 406) {
        response.json().then((data) => 
          messageError.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("messageError").style.display = "none";
          }, 1000);  
      }
      if (response.status === 200) {
        response.json().then((data) => {
        redflags = data.data
        let output = `
          <form action="#" class="form-container">
            <h2><span style="color:darkgreen">form-number</span> ${id}</h2>
            <h4>${redflags.status_}</h4>
            <label class="output"><i class="fa fa-institution"></i> Title</label>
            <output>${redflags.title}</output>
            <br>
            <label class="output"><i class="fa fa-address-card-o"></i> Location</label>
            <output>${redflags.longtitude},</output>
            <output> ${ redflags.latitude}</output>
            <br>
            <label class="output"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
            <br>
            <output>${redflags.comment}</output>
            <br>
            <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
          </form>
        `
        myForm.innerHTML = output;
      });
    }
  })
}

function editIncident(id){
  let myForm = document.getElementById('myForm');
  let status = document.getElementById('status').value;
  let newStatus = {
    status:status
  }
  fetch('http://127.0.0.1:5000/api/v3/user/red-flags/' + id '/status', {
    method: 'PATCH',
      mode: "cors",
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify(newStatus)
  }).then(function(response) {
      if (response.status === 404) {
        response.json().then((data) => 
          messageError.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("messageError").style.display = "none";
          }, 1000);  
      }
      if (response.status === 406) {
        response.json().then((data) => 
          messageError.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("messageError").style.display = "none";
          }, 1000);  
      }
      if (response.status === 200) {
        response.json().then((data) => {
        redflags = data.data
        let output = `
          <form action="#" class="form-container">
            <h1>Upadte redflag</h1>
            <h2><span style="color:darkgreen">form-number</span> ${id}</h2> 
            <p id="sucessIntervention" style="color: green"></p>
            <p id="messageError" style="color: red"></p>
            <select id="status">
              <option>Update-Status</option>
              <option>Rejected</option>
              <option>Resolved</option>
              <option>Under Investigation</option>
            </select>
            <label for="title"><i class="fa fa-institution"></i> Title</label>
            <br>
            <output class="output">${redflags.title}</output>
            <p id="longtitudeError" style="color: red"></p>
            <p id="latitudeError" style="color: red"></p>
            <br>
            <label for="adr"><i class="fa fa-address-card-o"></i> Location</label>
            <br>
            <output class="output">${redflags.longtitude},</output>
            <output class="output">${ redflags.latitude}</output>
            <br>
            <label for="Comment"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
            <br>
            <output class="output">${redflags.comment}</output>
            <p id="commentError" style="color: red"></p>
            <br>
            <button type="submit" class="btn">Update</button>
            <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
          </form>
        `
        myForm.innerHTML = output;
      });
    }
  })
}


window.onload = function loadPage() {
  let loading = document.getElementById('table');

  fetch('http://127.0.0.1:5000/api/v3/admin/red-flags', {
    method: 'GET',
      mode: "cors",
    headers:{
      'content-type':'application/json'
    }
  }).then(function(response) {
      if (response.status === 404) {
        response.json().then((data) => 
          messageError.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("messageError").style.display = "none";
          }, 1000);  
      }
      if (response.status === 406) {
        response.json().then((data) => 
          messageError.innerHTML = data.message
          window.setTimeout(function () {
            document.getElementById("messageError").style.display = "none";
          }, 1000);  
      }
      if (response.status === 200) {
        response.json().then((data) => {
          let output = `
	          <table>
	          <thead>
	          <tr>
	          <th>Id</th>
	          <th>Title</th>
            <th>IncidentType</th>
	          <th>Status</th>
	          <th>CreatedOn</th>
	          <th>View</th>
	          <th>Edit</th>
	          </tr>
	          </thead>
	          <tbody>
	          `
          redflags = data.data[0]
          for(redflag in redflags){
            output += `
              <tr>
              <td class="count"></td>
              <td>${redflags[redflag].title}</td>
              <td>${redflags[redflag].incident_type}</td>
              <td>${redflags[redflag].status_}</td>
              <td>${redflags[redflag].created_on}</td>
              <td><label onclick="(viewIncident(${redflags[redflag].incident_id})),openView()"><i class="fa fa-eye" style="color:green;"></i></label></td>
              <td><label onclick="(editIncident(${redflags[redflag].incident_id})),openEdit()"><i class="fa fa-edit" style="color:blue;"></i></label></td>
              </tr>
            `
          }
          output += `
          </tbody>
          </table>`
          
          loading.innerHTML = output;
     });
    }
  })
}
