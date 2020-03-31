class TVBO {
    constructor(imgid, data) {
        this.id = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.id);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        
        this.texid = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texid);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById(imgid));
    }
    draw() {
        gl.useProgram(getProgram());
        gl.bindTexture(gl.TEXTURE_2D, this.texid);
        
        var posAttrLoc = gl.getAttribLocation(getProgram(), 'vertPosition');
        var texAttrLoc = gl.getAttribLocation(getProgram(), 'vertTex');
        var mov = gl.getUniformLocation(getProgram(), 'mov');
        var rot = gl.getUniformLocation(getProgram(), 'rot');
        
        gl.uniform2f(mov, this.posx, this.posy);
        gl.uniformMatrix2fv(rot, false, [Math.cos(this.rot / 360 * 3.14), -Math.sin(this.rot / 360 * 3.14),
                            Math.sin(this.rot / 360 * 3.14), Math.cos(this.rot / 360 * 3.14)]);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.id);
        
        gl.vertexAttribPointer(posAttrLoc, 2, gl.FLOAT, gl.FALSE, 4 * 4, 0);
        gl.vertexAttribPointer(texAttrLoc, 2, gl.FLOAT, gl.FALSE, 4 * 4, 2 * 4);
        
        gl.enableVertexAttribArray(posAttrLoc);
        gl.enableVertexAttribArray(texAttrLoc);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    set x(x) {
        this.posx = x;
    }
    get x() {
        return this.posx;
    }
    set y(y) {
        this.posy = y;
    }
    get y() {
        return this.posy;
    }
    set rotation(r) {
        this.rot = r;
    }
    get rotation() {
        return this.rot;
    }
}
