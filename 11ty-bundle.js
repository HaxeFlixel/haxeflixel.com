

function copyAnchorLink() {
	if (navigator.clipboard)
		navigator.clipboard.writeText(window.location.href.replace(window.location.hash, ""));
	else
		console.log("Clipboard API not supported");
}

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
