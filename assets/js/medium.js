fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@samsir')
    .then((res) => res.json())
    .then((data) => {
        // Fillter the array
        const res = data.items //This is an array with the content. No feed, no info about author etc..
        const posts = res.filter(item => item.categories.length > 0) // That's the main trick* !

        function toText(node) {
            let tag = document.createElement('div')
            tag.innerHTML = node
            node = tag.innerText
            return node
        }
        function shortenText(text, startingPoint, maxLength) {
            return text.length > maxLength ?
                text.slice(startingPoint, maxLength) :
                text
        }

        let output = '';
        posts.forEach((item) => {
            output += `
            <div class="card">
                <a href="${item.link}"><img src="${item.thumbnail}" class="card-img-top" alt="..."></a>
                    <div class="card-body">
                        <h5 class="card-title"><a href="${item.link}">${item.title}</a></h5>
                        <p class="card-text">${shortenText(toText(item.content), 0, 123) + '...'}</p>
                    </div>

            </div>`
        })

        document.querySelector('.jsonContent').innerHTML= output
        

    })
