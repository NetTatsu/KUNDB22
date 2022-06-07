form.addEventListener("submit", () => {
    const editProfile = {
        id: id.value,
        psword: psword.value,
        confirmpsword: confirmpsword.value,
        nickname: nickname.value,
        tel: tel.value,
        email: email.value
    }
    fetch("/api/editProfile", {
        method: "POST",
        body: JSON.stringify(editProfile),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(data => {
            if (data.status == "error") {
                success.style.display = "none"
                error.style.display = "block"
                error.innerText = data.error
            } else {
                error.style.display = "none"
                success.style.display = "block"
                success.innerText = data.success
                location.href = "/profile";
            }
        })
})