function generateCode(){
    const date = new Date();
    const code = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}${Math.floor(Math.random()*1000)}`;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let generatedCode = '';
    for (let i = 0; i < 4; i++) {
        generatedCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `${code}-${generatedCode}`;
}

console.log(generateRoomId())
