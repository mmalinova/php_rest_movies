
function reload_artists() {
	$.get('artists').done(function (data) {
		$('#artists').html(render_artists(data.artists));
		$('#artists-messages').html(render_messages(data.messages));
	}).fail(function (response) {
		var data = response.responseJSON;
		$('#artists-messages').html(render_messages(data.messages));
	});
}

function reload_movies(artist_id) {
	$.get('artists/' + artist_id + '/movies').done(function (data) {
		$('#movies').html(render_movies(data.artist, data.movies));
		$('#movies-messages').html(render_messages(data.messages));
	}).fail(function (response) {
		var data = response.responseJSON;
		$('#movies-messages').html(render_messages(data.messages));
	});
}

$(document).ready(function () {

	reload_artists();

	$(document).on('click', 'a.artist-edit', function () {
		var artist_id = $(this).attr('data-artist-id');
		$.get('artists/' + artist_id).done(function (data) {
			$('#artist-edit').html(render_artist_form(data.artist));
			$('#artist-messages').html(render_messages(data.messages));
		}).fail(function (response) {
			var data = response.responseJSON;
			$('#artist-messages').html(render_messages(data.messages));
		});
		return false;
	});

	$(document).on('submit', '#artist-edit > form', function () {
		var edited_artist = $(this).serializeObject();
		$.postJSON('artists/' + edited_artist.id, edited_artist).done(function (data) {
			$('#artist-edit').html('');
			$('#artist-messages').html(render_messages(data.messages));
			reload_artists();
		}).fail(function (response) {
			var data = response.responseJSON;
			$('#artist-messages').html(render_messages(data.messages));
		});
		return false;
	});

	$(document).on('click', 'a.artist-movies', function () {
		var artist_id = $(this).attr('data-artist-id');
		reload_movies(artist_id);
		$('#movie-edit').html('');
		$('#movie-messages').html('');
		return false;
	});

	$(document).on('click', 'a.artists-list', function () {
		var movie_id = $(this).attr('data-movie-id');
		$.get('movies/' + movie_id + "/artists").done(function (data) {
			$('#movie-edit').html(render_movie_table(data.movie));
			$('#movie-messages').html(render_messages(data.messages));
		}).fail(function (response) {
			var data = response.responseJSON;
			$('#movie-messages').html(render_messages(data.messages));
		});
		return false;
	});
});
