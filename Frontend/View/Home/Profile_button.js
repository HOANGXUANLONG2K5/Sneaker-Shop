document.getElementById("userIcon").addEventListener("click",()=>{
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if(!user){
        window.location.href = "../Login/Login.html";
        return;
    }


    if(user.role === "admin"){
        window.location.href = "../Manage/Manage.html";
    }
    else{
        window.location.href = "../User_profile/User_profile.html";
    }
});