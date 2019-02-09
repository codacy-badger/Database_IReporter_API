function viewIncident(id){
  let myForm = document.getElementById('myForm');
  output = `
    <form action="#" class="form-container">
      <h2><span style="color:darkgreen">form-number</span> ${id}</h2>
      <h4>Under Investigation</h4>
      <label class="output"><i class="fa fa-institution"></i> Title</label>
      <br>
      <output>${redflags[redflag].title}</output>
      <br>
      <label class="output"><i class="fa fa-address-card-o"></i> Location</label>
      <br>
      <output>${redflags[redflag].longtitude}, </output>
      <output> ${redflags[redflag].latitude}</output>
      <br>
      <label class="output"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
      <br>
      <output>${redflags[redflag].comment}</output>
      <br>
      <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
    </form>
  `
  myForm.innerHTML = output;
}

function editIncident(id){
  let myForm = document.getElementById('myForm');
  output = `
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
      <input type="text" id="title" name="title" placeholder="${redflags[redflag].title}" required>
      <p id="longtitudeError" style="color: red"></p>
      <p id="latitudeError" style="color: red"></p>
      <label for="adr"><i class="fa fa-address-card-o"></i> Location</label>
      <br>
      <input type="location" id="long" style="float:left;" placeholder="${redflags[redflag].longtitude}" required>
      <input type="location" id="lat" style="float:left;" placeholder="${redflags[redflag].latitude}" required>
      <br>
      <label for="Comment"><i class="fa fa-comments" aria-hidden="true"></i> Comment</label>
       <textarea type="text" id="comment" name="comment" placeholder="${redflags[redflag].comment}" required></textarea>
      <p id="commentError" style="color: red"></p>
      <button type="submit" class="btn">Update</button>
      <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
    </form>
  `
  myForm.innerHTML = output;
}

function deleteIncident(id){
  alert(id);
}


window.onload = function loadPage() {
  let loading = document.getElementById('table');

  fetch('https://ireporter-api-v3.herokuapp.com/api/v3/admin/red-flags', {
    method: 'GET',
      mode: "cors",
    headers:{
      'content-type':'application/json'
    }
  }).then(function(response) {
      if (response.status === 404) {
        response.json().then((data) => 
            messageError.innerHTML = data.message)
      }
      if (response.status === 406) {
        response.json().then((data) => 
            messageError.innerHTML = data.message)
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
	          <th>Delete</th>
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
              <td><label onclick="(viewIncident(${redflags[redflag].incident_id}))"><i class="fa fa-eye" style="color:green;"></i></label></td>
              <td><label onclick="(editIncident(${redflags[redflag].incident_id}))"><i class="fa fa-edit" style="color:blue;"></i></label></td>
              <td><label onclick="(deleteIncident(${redflags[redflag].incident_id}))"><i class="fa fa-trash" style="color:red;"></i></label></td>
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
