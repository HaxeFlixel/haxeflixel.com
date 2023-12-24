---
layout: layouts/blog/blog.html
title: Blog
---

<ul>
{%- for post in collections.blog-post reversed -%}

<li>
<a href="{{post.url}}">{{post.data.title}} - {{post.data.postDate}}</a>
</li>
{%- endfor -%}
</ul>
<!-- {{ include "postslist.njk" }} -->

