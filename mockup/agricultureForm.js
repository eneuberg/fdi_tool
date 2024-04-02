document.getElementById('agricultureForm').onsubmit = function(event) {
  // Prevent the form from submitting the traditional way
  event.preventDefault();

  // Alternatively, use FormData to retrieve all the form fields
  const formData = new FormData(this);
  const ind1 = formData.get('name');
  const email = formData.get('email');


};

function handleFormData(name, email) {
  console.log('Name:', name);
  console.log('Email:', email);
  // Add your logic here to handle the form data
}
