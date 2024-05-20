---
title: "HaxeFlixel Site Update!"
layout: blog-post
postDate: "April 4, 2024"
---

The HaxeFlixel site finally got a bit of a facelift! After 4 years of Docpad being deprecated (we were on an even older version!), and 2 years of the initial "[Should we replace docpad?](https://github.com/HaxeFlixel/haxeflixel.com/issues/182)" Github issue raised by RichardBray, we have FINALLY migrated the static site generation code fully off Docpad, and we are now using [11ty](https://www.11ty.dev/) to generate the Haxeflixel site! This was lead by me, ninjamuffin99, as a small side project that begun the R&D phase in December, and started the serious work near the beginning of February.

The goals for the site update I aimed for:

- Updating the site to be low maintenance. 11ty was chosen for their track record of very stable releases that are easy to update versions with little breaking changes. _"We’ve shipped 56 releases dating back December 2017 and only two of those releases have had Eleventy-specific breaking changes."_[^1]
- Very flexible, which I wanted for a few reasons. I didn't want to do too much heavy porting or html rewriting. I think now we have the potential to work towards updating pages, content, layouts, etc. but for updating from Docpad to 11ty, I needed something where I might have to fit a square peg into a round hole.
- No heavy CSS / redesign. Initially I played around with [tailwindcss](https://tailwindcss.com/), and found it very lovely and fun! However I think a _redesign_ I think would be better for another time, and focusing in on just updating Bootstrap, which we've updated from Bootstrap 3.0 (released 2013) -> Bootstrap 5 (5.3.3 released February 2024). This also made porting the styles much more manageable, as I could re-use many of the styles we already have but still giving the site a fresher look.
- Darkmode (and light mode)

Total work was a bit on and off over a few weeks, but finally got the site fully updated to have no Docpad related code around February 20th 2024!

Removing Docpad wasn't just a case of "old tech bad, new tech fun and good", there are many things that make the developer experience when working on the site much nicer now!

- Easier local development. Previously you'd need to `npm install`, which installed a bit of an older version of Docpad, and you also had to install ImageMagick for thumbnail generation (and you'd still run into issues!). Now when you `npm install`, you should simply have everything you need, on latest versions of it all.
- Faster builds. On my machine™ building the site takes about 1.85s, and when developing you can use `--incremental` to only build the files that have changes for very fast builds.

Now with new site generation backend, we are aiming for some cool new features for the site in future updates

- [Better site search](https://github.com/HaxeFlixel/haxeflixel.com/issues/256)
- [Giscus/github based comments on blogs](https://github.com/HaxeFlixel/haxeflixel.com/issues/253)
- [Dedicated pages for showcase items](https://github.com/HaxeFlixel/haxeflixel.com/issues/222)
- [Adding "reading time" to blogs and docs pages](https://github.com/HaxeFlixel/haxeflixel.com/issues/255)
- [Porting API documentation](https://github.com/HaxeFlixel/haxeflixel.com/issues/251)

If you have any suggestions for site features, content, or bug reports, do feel free to file an issue in the `haxeflixel/haxeflixel.com` repo! <https://github.com/HaxeFlixel/haxeflixel.com/issues>

And if you'd like to contribute to the site, take a look at the readme.md: <https://github.com/HaxeFlixel/haxeflixel.com?tab=readme-ov-file#about>

[^1]: https://www.11ty.dev/blog/stability/
