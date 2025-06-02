import showdown from 'showdown';
import fs from 'fs';

const converter = new showdown.Converter();
const markdown = fs.readFileSync('README.md', 'utf-8');
const html = converter.makeHtml(markdown);

const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bayesian Attention Mechanism Stocks</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body {
            padding: 2rem;
        }
    </style>
</head>
<body>
    <div class="container">
        ${html}
    </div>
</body>
</html>
`;

if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}
fs.writeFileSync('dist/index.html', fullHtml);