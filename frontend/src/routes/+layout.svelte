<script>
</script>

<!-- <Navbar /> -->
<slot />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Poppins&display=swap');
	:root {
		--primary: #d05525;
		--text: #16100a;
		--secondary: #ddbe9f;
		--accent: #cf9e6c;
		--background: #f0efee;
	}

	:global(body) {
		font-family: 'Poppins', sans-serif;
		margin: 0;
	}
	:global(h1, h2, h3, h4, h5, h6, p) {
		margin: 0;
		color: var(--text);
	}
</style>