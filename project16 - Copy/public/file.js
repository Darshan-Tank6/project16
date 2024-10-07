document.addEventListener('DOMContentLoaded', function() {
    fetch('/auth/user-role')
      .then(response => response.json())
      .then(data => {
        if (data.role === 'admin') {
          document.getElementById('upload-box').style.display = 'block';
          // downloadButton.style.display = 'none';
          // deleteButton.style.display = 'none';
        }
      });
  });



// Function to fetch the list of uploaded files
fetch('/file/files')
  .then(response => response.json())
  .then(files => {
    const fileList = document.getElementById('fileList');
    files.forEach(file => {
      const listItem = document.createElement('li');

      // Create a link to view the file
      const fileLink = document.createElement('a');
      fileLink.href = `/file/files/${file._id}`;
      fileLink.textContent = file.name;
      listItem.appendChild(fileLink);

      
            // User is an admin, create download and delete buttons

            // Create a download button
            const downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download';
            downloadButton.style.marginLeft = 'auto';
            downloadButton.style.marginRight = '10px';
            downloadButton.style.cursor = 'pointer';
            downloadButton.addEventListener('click', () => {
              window.location.href = `/file/files/${file._id}/download`;
            });
            listItem.appendChild(downloadButton);
            
            // Fetch the user's role to determine if admin-specific buttons should be displayed
            fetch('/auth/user-role')
            .then(response => response.json())
            .then(data => {
              if (data.role === 'admin') {

            // Create a delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.style.marginLeft = '10px';
            deleteButton.style.cursor = 'pointer';
            deleteButton.addEventListener('click', () => deleteFile(file._id, listItem));
            listItem.appendChild(deleteButton);
          }
        })
        .catch(error => {
          console.error('Error fetching user role:', error);
        });

      // Append the list item to the file list
      fileList.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error('Error fetching file list:', error);
  });


  fetch('/auth/user-role')
    .then(response => response.json())
    .then(data => {
      if (data.role === 'admin') {
        console.log("this is admin");
        document.getElementById('upload-box').style.display = 'block';
      }});

// Function to delete a file
function deleteFile(fileId, listItem) {
if (confirm('Are you sure you want to delete this file?')) {
  fetch(`/file/files/${fileId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      // Remove the file from the list if delete was successful
      listItem.remove();
      alert('File deleted successfully.');
    } else {
      alert('Error deleting file.');
    }
  })
  .catch(error => {
    console.error('Error deleting the file:', error);
    alert('Error deleting the file.');
  });
}
}



// const parentDivs = document.getElementsByClassName('myButton');

// // Loop through each button
// Array.from(parentDivs).forEach(button => {
// button.addEventListener('click', function(event) {
//     const clickedChild = event.target;
//     const parent = clickedChild.parentElement;
//     const parent2 = parent.parentElement;
//     const sib = parent2.nextElementSibling; // Get the sibling div

//     // Check if the sibling exists
//     if (sib) {
//         // Toggle display between 'block' and 'none'
//         if (sib.style.display === 'none' || sib.style.display === '') {
//             clickedChild.textContent="-";
//             sib.style.display = 'block'; // Show the sibling
                
//         } else {
//             sib.style.display = 'none'; // Hide the sibling
//             clickedChild.textContent="+";
//         }
//     }
// });
// });