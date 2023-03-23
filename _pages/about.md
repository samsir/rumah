---
layout: page
title: About
menu: false
order: 10
cover-img: https://samsiral.am/assets/img/ava.png
---

{% assign author = site.data.authors[page.author] | default:site.data.authors.first[1] %}

{% if author.name %}
  {% include components/author.html author=author %}
{% endif %}
