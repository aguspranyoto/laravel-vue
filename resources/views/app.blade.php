<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script>
        try {
            var t = document.cookie.match(/(?:^|; )theme=([^;]*)/);
            var theme = (t && decodeURIComponent(t[1])) || localStorage.getItem('theme') || 'system';
            var dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
            if (dark) document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
        } catch (e) {}
    </script>
    @vite(['resources/css/app.css', 'resources/js/app.ts'])
    @inertiaHead
</head>
<body class="font-sans antialiased">
    @inertia
</body>
</html>
