var vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'attribute vec2 vertTex;',
'varying vec2 fragTex;',
'uniform vec2 mov;',
'uniform mat2 rot;',
'',
'void main()',
'{',
'   fragTex = vertTex;',
'   vec2 vertPos = (vertPosition - vec2(0.5, 0.5)) * rot + vec2(0.5, 0.5);',
'   vertPos = vertPos + mov;',
'   gl_Position = vec4((vertPos.x - 8.0) / 8.0, (vertPos.y - 4.5) / 4.5, 1.0, 1.0);',
'}'
].join('\n');

var fragmentShaderText =
[
'precision mediump float;',
'',
'varying vec2 fragTex;',
'uniform sampler2D tex;',
'uniform float green;',
'',
'void main()',
'{',
'   vec4 color = texture2D(tex, fragTex);',
'   color.y += green;',
'   if (color.x >= 1.0 && color.y >= 1.0 && color.z >= 1.0) color.w = 0.0;',
'   gl_FragColor = color;',
'}'
].join('\n');

var InitKeyCallback = function() {
    document.addEventListener('keydown', function(e) {
        if (e.code == 'KeyW') keys[0] = true;
        if (e.code == 'KeyS') keys[1] = true;
        if (e.code == 'KeyA') keys[2] = true;
        if (e.code == 'KeyD') keys[3] = true;
        if (e.code == 'KeyF') keys[4] = true;
    });
    document.addEventListener('keyup', function(e) {
        if (e.code == 'KeyW') keys[0] = false;
        if (e.code == 'KeyS') keys[1] = false;
        if (e.code == 'KeyA') keys[2] = false;
        if (e.code == 'KeyD') keys[3] = false;
        if (e.code == 'KeyF') keys[4] = false;
    });
    document.getElementById('game-surface').addEventListener('mousemove', function(e) {
        mouseY = 900 - (e.pageY - 44);
        mouseX = e.pageX - 10;
    });
}

var reset = function() {
    welt.reset();
}

var InitShaders = function() {
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    
    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);
    
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('ERROR', gl.getShaderInfoLog(vertexShader));
        return;
    }
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('ERROR', gl.getShaderInfoLog(fragmentShader));
        return;
    }
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('ERROR', gl.getProgramInfoLog(program));
        return;
    }
    return program;
}

var getProgram;
var keys = [false, false, false, false, false];
var dt;
var welt;
var mouseX, mouseY;

var InitDemo = function() {
    var canvas = document.getElementById('game-surface');
    gl = canvas.getContext('webgl', { alpha: false });
    if (!gl) {
        alert('Error');
    }
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    var program = InitShaders();
    
    getProgram = function() {
        return program;
    }
    
    InitKeyCallback();
    
    welt = new Welt();
    
    var date = new Date();
    var lastt = date.getTime();
    
    var loop = function() {
        date = new Date();
        var newt = date.getTime();
        dt = newt - lastt;
        lastt = newt;
        
        if (dt > 1000) welt.reset();
        
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        welt.draw();
        
        requestAnimationFrame(loop);
    };
    
    requestAnimationFrame(loop);
}
