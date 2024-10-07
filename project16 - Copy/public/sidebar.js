function openfn() {
    document.getElementById("sidebar").style.display = "block";
}

function closefn() {
    document.getElementById("sidebar").style.display = "none";
}




// fetch('/files')
// .then(response => response.json())
// .then(files => {
//     const fileList = document.getElementById('fileList');
//     files.forEach(file => {
//         const listItem = document.createElement('li');
//         const fileLink = document.createElement('a');
//         fileLink.href = `/files/${file._id}`;
//         fileLink.textContent = file.name;
//         listItem.appendChild(fileLink);
//         fileList.appendChild(listItem);
//     });
// })
// .catch(error => {
//     console.error('Error fetching file list:', error);
// });





// // Fetch the list of uploaded files
// fetch('/file/files')
// .then(response => response.json())
// .then(files => {
//   const fileList = document.getElementById('fileList');
//   files.forEach(file => {
//     const listItem = document.createElement('li');
    
//     // Create a link to view the file
//     const fileLink = document.createElement('a');
//     fileLink.href = `/file/files/${file._id}`;
//     fileLink.textContent = file.name;
//     listItem.appendChild(fileLink);
//     // fetch('/auth/user-role')
//     //         .then(response => response.json())
//     //         .then(data => {
//     //           if (data.role === 'admin') {
//                 // console.log(data.role);
//               // Create a download button for each file
//               const downloadButton = document.createElement('button');
//               downloadButton.textContent = 'Download';
//               downloadButton.style.marginLeft = 'auto';
//               downloadButton.style.marginRight = '10px';
//               downloadButton.style.cursor = 'pointer';
    

//                 downloadButton.addEventListener('click', () => {
//                   window.location.href = `/file/files/${file._id}/download`;
//                 });
//                 listItem.appendChild(downloadButton);

//                 // Create a delete button for each file
//                 const deleteButton = document.createElement('button');
//                 deleteButton.textContent = 'Delete';
//                 deleteButton.style.marginLeft = '10px';
//                 deleteButton.addEventListener('click', () => deleteFile(file._id, listItem));
//                 deleteButton.style.right="0";
//                 deleteButton.style.cursor="pointer";
                
//                 listItem.appendChild(deleteButton);
//                 fileList.appendChild(listItem);
//             // }});
  
// });
// })
// .catch(error => {
//   console.error('Error fetching file list:', error);
// });




//
// const fileInput = document.getElementById('fileInput');

// // Listen for file input change event
// fileInput.addEventListener('change', () => {
//   // Automatically submit the form when a file is selected
//   document.getElementById('uploadForm').submit();
// });



//



        function logout() {
          fetch('/auth/logout')
            .then(() => {
              window.location.href = '/login';
            });
        }
    
        function goToNotices() {
          window.location.href = '/dashboard';
        }

        function goToDetails() {
          window.location.href = '/user-details';
        }

        
