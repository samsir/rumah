$(function () {
    var mediumPromise = new Promise(function (resolve) {
    var $content = $('#jsonMedium');
    var data = {
        rss: 'https://samsir.medium.com/feed'
    };
    $.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fsamsir.medium.com%2Ffeed', data, function (response) {
        if (response.status == 'ok') {
            var display = '';
            $.each(response.items, function (k, item) {
                display += `<div class="card rounded-0 mb-4"><div class="row g-0"><div class="col-md-3">`;
                var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
                var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
                var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
                var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
                var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
                display += `<a href="${item.link}"><img src="${src}" class="img-fluid" alt="Cover image"></a>`;
                display += `</div>`;
                display += `<div class="col-md-9"><div class="card-body"><h2 class="card-title"><a href="${item.link}">${item.title}</a></h2>`;
                var yourString = item.description.replace(/<img[^>]*>/g,""); //replace with your string.
                var maxLength = 269; // maximum number of characters to extract
                //trim the string to the maximum length
                var trimmedString = yourString.substr(0, maxLength);
                //re-trim if we are in the middle of a word
                trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
                display += `<p class="card-text">${trimmedString}...</p>`;
                display += '</div></div></div></div>';
                return k < 10;
            });

            resolve($content.html(display));
        }
    });
    });

mediumPromise.then(function()
    {
        //Pagination
        pageSize = 4;

        var pageCount = $(".card").length / pageSize;

        for (var i = 0; i < pageCount; i++) {
            $("#pagin").append(`<li class="page-item"><a class="page-link" href="#">${(i + 1)}</a></li>`);
        }
        $("#pagin li:nth-child(1)").addClass("active");
        showPage = function (page) {
            $(".card").hide();
            $(".card").each(function (n) {
                if (n >= pageSize * (page - 1) && n < pageSize * page)
                    $(this).show();
            });
        }

        showPage(1);

        $("#pagin li").click(function () {
            $("#pagin li").removeClass("active");
            $(this).addClass("active");
            showPage(parseInt($(this).text()))
            return false;
        });
    });
});