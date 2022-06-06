form.addEventListener("submit", () => {
    const login = {
        id: id.value,
        psword: psword.value
    }
    fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(login),
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
                location.href = "/";
            }
        })
})