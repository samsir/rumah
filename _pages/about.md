---
layout: page
title: About
menu: false
order: 10
cover-img: https://samsiral.am/assets/img/ava.png
---

{% assign author = site.data.authors[page.author] | default:site.data.authors.first[1] %}

<div class="card">
  <div class="row">
    <div class="col-md-4">
    {% if author.picture %}
    {% include components/srcset-img.html img=author.picture class="img-fluid" alt=author.name %}
    {% endif %}
    </div>
    <div class="col-md-8">
      <div class="card-body">
      {{ author.about | markdownify }}
      </div>
    </div>
  </div>
</div>
