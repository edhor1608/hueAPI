const fetch = require('node-fetch')
const express = require('express')
const { on } = require('..')

let red = {
    on: true, sat: 254, bri: 254, hue: 0
}

let green = {
    on: true, sat: 254, bri: 254, hue: 25500 
}

let blue = {
    on: true, sat: 254, bri: 254, hue: 46920  
}

function hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    h = Math.round(h / 360 * 65535,0);
    s = Math.round(s /100  * 254,0);
    l = Math.round(l/100 *254,0);
  
    return {"on": true, "hue": h, "sat": s, "bri": l};
  }

module.exports = {

    alert: (req, res) => {
      fetch('http://192.168.178.28/api/vjMcYDi3JRTEaJJilCxopk54N4bffrArgWQPeUaw/groups/9/action', {
          method: 'PUT',
          body: JSON.stringify({
            "on": true,
            "alert": "lselect",
          }),
          headers: { 'Content-Type': 'application/json' }
      })
      for(i = 0; i < 10 ; i++){
      fetch('http://192.168.178.28/api/vjMcYDi3JRTEaJJilCxopk54N4bffrArgWQPeUaw/groups/9/action', {
          method: 'PUT',
          body: JSON.stringify({
            "hue":0
          }),
          headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
        .then(json => console.log(json));

        /*fetch('http://192.168.178.28/api/vjMcYDi3JRTEaJJilCxopk54N4bffrArgWQPeUaw/groups/9/action', {
          method: 'PUT',
          body: JSON.stringify({
            "hue":25500
          }),
          headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
        .then(json => console.log(json));
      */

        fetch('http://192.168.178.28/api/vjMcYDi3JRTEaJJilCxopk54N4bffrArgWQPeUaw/groups/9/action', {
          method: 'PUT',
          body: JSON.stringify({
            "hue":46920
          }),
          headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
        .then(json => console.log(json));
    }

      return res.status(200)
  },

    setHex: (req, res) => {
        var c = hexToHSL(req.params.hex)
        const color = fetch('http://192.168.178.28/api/vjMcYDi3JRTEaJJilCxopk54N4bffrArgWQPeUaw/groups/9/action', {
            method: 'PUT',
            body: JSON.stringify(c),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
          .then(json => console.log(json));

        return res.status(200).json({ color: c })
    },

    setHue: (req, res) => {
        var c = {
            "on": true,
            "bri": 254,
            "hue": parseInt(req.params.hue),
            "sat": 254,
            
        }
        const color = fetch('http://192.168.178.28/api/vjMcYDi3JRTEaJJilCxopk54N4bffrArgWQPeUaw/groups/9/action', {
            method: 'PUT',
            body: JSON.stringify(c),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
          .then(json => console.log(json));

        return res.status(200).json({ color: color })
    },

    setRed: (req, res) => {
        const color = fetch('http://192.168.178.28/api/vjMcYDi3JRTEaJJilCxopk54N4bffrArgWQPeUaw/groups/9/action', {
            method: 'PUT',
            body: JSON.stringify(red),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
          .then(json => console.log(json));

        return res.status(200).json({ color: JSON.stringify(red) })
    },
    setGreen: (req, res) => {
        const color = fetch('http://192.168.178.28/api/vjMcYDi3JRTEaJJilCxopk54N4bffrArgWQPeUaw/groups/9/action', {
            method: 'PUT',
            body: JSON.stringify(green),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
          .then(json => console.log(json));

        return res.status(200).json({ color: color })
    },
    setBlue: (req, res) => {
        const color = fetch('http://192.168.178.28/api/vjMcYDi3JRTEaJJilCxopk54N4bffrArgWQPeUaw/groups/9/action', {
            method: 'PUT',
            body: JSON.stringify(blue),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
          .then(json => console.log(json));

        return res.status(200).json({ color: color })
    }
}