let records = [];

for (let i = 0; i < 10; i++) {
    let user = JSON.parse(localStorage.getItem("Pacman" + i));
    records.push(user);
}

let sortRecords = records.sort((item1, item2) => { return item2.Score - item1.Score; });

document.write('<table id="scoreTable">');
document.write('<tr><th>№</th><th>User</th><th>Score</th></tr>');
for (let i = 0; i < sortRecords.length; i++) {
    document.write('<tr>');
    document.write('<td>' + (i + 1) + '</td>');
    document.write('<td class="UserName">' + sortRecords[i].Name +'</td>');
    document.write('<td class="ScoreCell">' + sortRecords[i].Score +'</td>');
    document.write('</tr>');
}
document.write('</table>');