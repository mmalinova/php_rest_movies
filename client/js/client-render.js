// All these function render piece of HTML to plug into the DOM tree.
// The HTML can be plugged using $('#id').html(new_html);

function render_artists(artists) {
	var html = "<tr>" +
		"<th>ArtistID</th>" +
		"<th>First name</th>" +
		"<th>Last name</th>" +
		"<th></th>" +
		"</tr>";

	for (var i = 0; i < artists.length; i++) {
		var artist = artists[i];
		html += "<tr>" +
			"<td>" + artist.id + "</td>" +
			"<td><a href='#' data-artist-id='" + artist.id + "' class='artist-movies'>" +
			html_escape(artist.first_name) +
			"</a></td>" +
			"<td>" + html_escape(artist.last_name) + "</td>" +
			"<td>" +
			"<a href='#' data-artist-id='" + artist.id + "' class='edit_icon artist-edit'>Edit</a> " +
			"</td>" +
			"</tr>";
	}

	html = "<table class='grid'>" + html + "</table>";
	return html;
}

function render_artist_form(artist) {
	if (!artist) return 'Empty artist.';
	var html = '';
	var title = 'Edit artist';

	html += "<h1>" + title + "</h1>";
	html += "<form action='#' method='post'>";
	html += "<p><label>ID</label><input name='id' value='" + html_escape(artist.id) + "' readonly='readonly' /></p>";
	html += "<p><label>First name</label><input name='first_name' value='" + html_escape(artist.first_name) + "'/></p>";
	html += "<p><label>Last name</label><input name='last_name' value='" + html_escape(artist.last_name) + "'/></p>";
	html += "<p><button>Save</button></p>";
	html += "</form>";

	return html;
}

function render_movies(artist, movies) {
	var html = '';

	html += "<table class='grid'>";
	html += "<tr>" +
		"<th>ArtistID</td>" +
		"<th>First name</th>" +
		"<th>Last name</th>" +
		"<th>Title of movie</th>" +
		"<th>Year of movie</th>" +
		"</tr>";
	for (var i = 0; i < movies.length; i++) {
		var movie = movies[i];
		html += "<tr>" +
			"<td>" + artist.id + "</td>" +
			"<td>" + html_escape(artist.first_name) + "</td>" +
			"<td>" + html_escape(artist.last_name) + "</td>" +
			"<td><a href='#' data-artist-id='" + artist.id + "' data-movie-id='" + movie.id + "' class='artists-list'>" + html_escape(movie.title) + "</a></td>" +
			"<td>" + movie.yr + "</td>" +
			"</tr>";
	}
	html += "</table>";

	return html;
}

function render_movie_table(movie) {
	var html = "<tr>" +
		"<th>Title of movie</th>" +
		"<th>First name of artist</th>" +
		"<th>Last name of artist</th>" +
		"</tr>";
	for (var i = 0; i < movie.length; i++) {
		var m = movie[i];
		html += "<tr>" +
			"<td>" + m.title + "</td>" +
			"<td>" + html_escape(m.first_name) + "</td>" +
			"<td>" + html_escape(m.last_name) + "</td>" +
			"</tr>";
	}

	html = "<table class='grid'>" + html + "</table>";
	return html;
}

function render_messages(messages) {
	var html = '';
	if (messages) {
		for (var i = 0; i < messages.length; i++) {
			var m = messages[i];
			var css = (m.type === 'error') ? 'error_icon' : 'info_icon';
			html += "<p class='" + css + "'>" + m.text + "</p>";
		}
	}
	return html;
}

function html_escape(val) {
	return (val + '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/\"/g, '&quot;')
		.replace(/\'/g, '&apos;');
}

