copy(Array.from($('div.img-content', $('div.card')).map((_, img) => {
    _ = /.*(?<=\/\/)(.*)(?=@).*(?<=width:\s)([0-9]+).*(?<=height:\s)([0-9]+).*/.exec(img.style.cssText);
    if (_) {
        return {
            img_src: 'https://' + _[1],
            img_width: Number(_[2]),
            img_height: Number(_[3])
        }
    } else {
        return {
            img_src: 'https://' + /(?<=\/\/).*(?=@)/.exec(img.style.cssText)[0],
            img_width: 240,
            img_height: 320
        }
    }
})))