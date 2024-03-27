

function copyAnchorLink() {
	if (navigator.clipboard)
		navigator.clipboard.writeText(window.location.href.replace(window.location.hash, ""));
	else
		console.log("Clipboard API not supported");
}
