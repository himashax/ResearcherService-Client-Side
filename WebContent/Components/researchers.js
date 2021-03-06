$(document).ready(function()
{ 
if ($("#alertSuccess").text().trim() == "") 
 { 
 $("#alertSuccess").hide(); 
 } 
 $("#alertError").hide(); 
});

function validateItemForm() 
{ 

if ($("#resID").val().trim() == "") 
 { 
 return "Insert Researcher ID."; 
 } 

if ($("#firstName").val().trim() == "") 
 { 
 return "Insert First Name."; 
 } 

if ($("#lastName").val().trim() == "") 
 { 
 return "Insert Last Name."; 
 } 

if($("#email").val().trim() == ""){
	return "Insert Researcher Email.";
}

var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
if(!$("#email").val().match(mailformat)){
	return "Incorrect Email Format"; 
}


if ($("#dept").val().trim() == "") 
 { 
 return "Insert Researcher's Department."; 
 } 
return true; 
}	


$(document).on("click", "#btnSave", function(event){ 
	
	 $("#alertSuccess").text(""); 
	 $("#alertSuccess").hide(); 
	 $("#alertError").text(""); 
	 $("#alertError").hide(); 
	
	var status = validateItemForm(); 
	if (status != true) 
	 { 
	 $("#alertError").text(status); 
	 $("#alertError").show(); 
	 return; 
	 } 
	
	var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT"; 

	$.ajax( 
	 { 
	 url : "ResearcherAPI", 
	 type : type, 
	 data : $("#formRes").serialize(), 
	 dataType : "text", 
	 complete : function(response, status){
		 onItemSaveComplete(response.responseText, status); 
	 } 
	 }); 
});


function onItemSaveComplete(response, status){
	
	if (status == "success") { 
		
		 var resultSet = JSON.parse(response); 
		 if (resultSet.status.trim() == "success") 
		 { 
			 $("#alertSuccess").text("Successfully saved."); 
			 $("#alertSuccess").show();
			 $("#divItemsGrid").html(resultSet.data); 
			 
		 }  else if (resultSet.status.trim() == "error") { 
			 $("#alertError").text(resultSet.data); 
			 $("#alertError").show(); 
		 }
		 
	 } else if (status == "error") {
		 
		 $("#alertError").text("Error while saving."); 
		 $("#alertError").show(); 
		 } else
		 { 
		 $("#alertError").text("Unknown error while saving.."); 
		 $("#alertError").show(); 
		 }
	
	 $("#hidItemIDSave").val(""); 
	 $("#formRes")[0].reset(); 
	}


$(document).on("click", ".btnUpdate", function(event)
		{ 
		 $("#hidItemIDSave").val($(this).data("resid")); 
		 $("#resID").val($(this).closest("tr").find('td:eq(0)').text()); 
		 $("#firstName").val($(this).closest("tr").find('td:eq(1)').text()); 
		 $("#lastName").val($(this).closest("tr").find('td:eq(2)').text()); 
		 $("#email").val($(this).closest("tr").find('td:eq(3)').text());
		 $("#dept").val($(this).closest("tr").find('td:eq(4)').text());
		});


function onItemDeleteComplete(response, status)
{ 
if (status == "success") 
 { 
	 var resultSet = JSON.parse(response); 
	 if (resultSet.status.trim() == "success") 
	 { 
		 $("#alertSuccess").text("Successfully deleted."); 
		 $("#alertSuccess").show();
		 $("#divItemsGrid").html(resultSet.data); 
		 
	 }else if (resultSet.status.trim() == "error") 
	 { 
		 $("#alertError").text(resultSet.data); 
		 $("#alertError").show(); 
		 }
 }else if (status == "error") 
 { 
	 $("#alertError").text("Error while deleting."); 
	 $("#alertError").show(); 
	 } else
	 { 
	 $("#alertError").text("Unknown error while deleting.."); 
	 $("#alertError").show(); 
	 } 
}


$(document).on("click", ".btnRemove", function(event)
	{ 
		 $.ajax( 
		 { 
		 url : "ResearcherAPI", 
		 type : "DELETE", 
		 data : "id=" + $(this).data("resid"),
		 dataType : "text", 
		 complete : function(response, status) 
		 { 
			 onItemDeleteComplete(response.responseText, status); 
		 } 
	}); 
});
	