import { useState, useEffect, useRef, useCallback } from "react";

const C = {
  navy: "#0A1628", navyMid: "#132240", navyLight: "#1B3A5C",
  red: "#B22234", redLight: "#D4435A",
  gold: "#C5A55A", goldLight: "#E2CB82",
  cream: "#F5F0E8", white: "#FFFFFF", muted: "#8A9BB5",
};

const TIM_PHOTO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAJYAZADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0ACnAUAUooEAFLigUtAAKWkpaQBS0lFMBaKKKQBRRRQAUopKWgBaKKKAEpaKKBhRRRQAUUUUAFFLRQAmKWiigAooooAKKKKADFFFFABSUtFACUUuKSgAooooAKKKKACiiigApKWigBKMUUUCExSGnUYpgMK5ppFSYpCKAGUopKWgBaKSloAKWkooAWiiigApaSikAtFFFABS0lFAC0UUtMAooopDCiiigApaKKACiiigQUUEhQSSAB3NYVz400G1nMLXyyOpw3ljcF/H/AAoGbtFcTf8AxP0+3YraWM9x6O5CL/U1Wb4qRbf3WmFjjq0mB/Ki6HZnf0teUXnxQ1edgLSG1t1Byx2lyfbmt+x+KGnSQL9ts54Ze4jw6n37UXQWZ3FJXPaf468P6hMsKXhhlZtoWdCmT9eldDQIKKKKACiiigBKKWigBKKWkoAKKKKBBRRRTGFFFFAhKKWigBKTFLQaAIqWkooAUUtNpc0ALRSZpaQBQDRRTAWikpaQBS0lLQAUUUUAFLSUooAWiiigYUtJS0AFFFH5UCCuY8TeNLfRGa1tVS4vB94Fvkj/AN7Hf2rH8QfEeErLZ6KHZ+Va5YYC9soO59DXEiCR4fPeVUJBbBOWOe5PqamUrGkY3NDV/FOr64fKuLgxwH/ljCNoP17k/Wqf9kg7Wmk2r12Lzj6+9VY7mOBSsBy2eZG6/gKlt90pacGQxjhTnlvf2rNts1SSHT6XPkvHaNNEoz94Y/HH8s1QnlITy5GjX/YXhV/xq1LfSm3CGJWZzhIzlto9T71EFto2RTPN5ufnk4Kr7Ad6YFFlIYMhyueWxgN9PanGNliWUtwT0FaE8ttlVlMUwA4Kjy2H17GhbZp4ZLq2HniIZKADK++B1H0p3FYoyy+Vg4bcecetdT4Q8dzaTcrb380klk5AO8ljF7j/AArlo2mn81y+0BeSTjPtUUkBaMzI24E4IPrimmS1c+iba5gvLdbi2lWaJxlXQ5BqWvneC9vYEX7PdXCJGc7UkYD8ga9d8F+MY/EEItJYplu4YwXdh8r+/sau5m1Y6ukpaSmIKKKKACiiigBKKWkoAKKKKBBRRRQMKKKKBBSUtFAENFFFABRRRQAUtJRQAtLSUUgFopKWmAtFJS0gFopKWgApRSUooAWiiigYtFJS0AHevOviD4xaIvomnSkSfduHUYI/2Qf51391cR2ttJNKcKilj+FeAaldnUNamuBGVM772yeaTY4q7LKRx21j5rDLyHj/ABqs85uSPkl24wAGxzU1yhmlTeP3CEBsHkD1FWWmAWSO2iCr8qqccnGc/mcGsrnRYoiwnVJCFZCFyMjpmrcF1JbsGhA+RdsYPReOv1q/breXMgByQRjkcVfj8ONMTmNgOgGcYqXNItQbMe0FvAw2zh2KnfKqk9ecDPf3pzW0TWcgggBCLhblm6Djdgdz2zW63hR2T92xyR35obwVdbVMcyt7MOlT7RD9kzBj0oB2W3cPGQoXcmXdiOcDqe9Rma5srzy0EkMaHkLkk/iOK3bjwrq1uxmQ+aR/cOCKht7S6kV4biIsEXhDxjmnzoPZMwL9PtKvLFnIOWGzafqQOD9ao280ibYgAUdvnyuQRW5qVsbeBZ0iZHyQd3TH8qzbJoJLr96NuB90L3q09DNx1GTWDRA3MAfys88EgfjWl4X19tC1VL0IWj27ZgOcr/U02SWa33RLuVJM5TsBgYHuelZMqJFPKo4GSRg9KqLJkj33RdYtdc05L6zLeUxIw4wQR6ir9ed/Ca832t9aG4J2srrEe2eCR+leiVoYCUUtJQAUUUUAFFFFMBKKKKBBRRRQAUUUUAFFFFAEFFFFAC0lFFAC0UlFIBaKSlpgLRmkopAOopKWgBaKSloAWiiigB1FJS0AFLSUtAHNeP8AUp9M8LTS2+BJI6xBj/CG6n8q8ZgXbIJDyCcYPpXrnxJs5rrw6GSXbHC+91/vcYA/U15NF+7iMY5LMF/z+FTI1gjZsLQ3WEjBdB3augtdKhjABRSfbvUOjrGlnkDk/wAq1oU3cAdK45ydzvpxVia3togRhRwetakKA4FVreDLDJ6VqwQHHArM00Q1YwrdPrViNN3anGPaKkjBxgdKpIhsY8YxgCqFzp1vMcvCrHPcVqgZ61HIgI4oaEpHMavoNve2jRBFQ9sCuLbwVfW9zmErtzwSa9QmjwOOaoSocfXmkpOOxbipbnGT6JqDIshjiLIuOW/X3rk723ZLho2HzDlhjkGvUpyAD6Vw2qQ+bqDszYI68c1tTm29TnqwSWhqfC5HTxG3HDQPn36Yr1uvNfhrBF/bVzJzvjt8D2yef5V6VXVE45bhRRRTJEopaSgQUUUUwCiiigYlFLSUCCiiigAooooAr0UUlAC0ZpM0UALRSUtIBaKSimAtLmkzRSAWlpKKAHUopopaAFpaSloAWlptLQAtLSUooGU9YgjudGvIZVyrwOD/AN8mvB0GPmPdutfQFwnm20sf99GX8xXgeza5U4yp5HuKiRpA6LSJiyleTjnmuksuVA/WuW0ZizADpiunsDkZ9DiuSe5303obNquDn1rWiICjis+1HetBFBFShyY7IIoU0bAKcF9RxVEBu45pG9qeEJYcU5k4yadhXKcgJHSqUse3IxWo6gCqUxQk8ioaNEzCvV2hiBjjpXCXjf8AE0Ks2QPlwe1eg34Ab1rgPEFu9vqBcdDgiqp7k1fhOj+HTkeIJhnAe3IOe/INel15X8O5mHicJgndAwb9CK9UrsjsefLcKKKKogKKKKAEooopgFFFFABRRRQAUlFFABRRRQBWpKKKACiijNIAoozRmgBc0UlFAC0tJRmgB1LTaWgB1ApKWgBaWkpRQAtKKSloAWikpaBi14ZrNsLPW762GP3c7gYPbOa9zrxjxlbm08XXsfG138xcDsRmplsXDcn0WDbAZj1PArodPuIoVHmkZPIXuawNHbdYAY5zUqaPf3lwzJIEU8bsdq5Wrs7ouy0OsXW7aJQzNtHvxUsfi7SgwBmfrj7h4rnW8K28MYOo60Ix3QqoH51BLpPhqXaYdalkfoAZAfw5xQkJs7m21uxvHKQy/MvUEYrQWZSBjBrhLa1jsiHhLOV4JcEN/wDX/Cun0y9S4wOmO1TcpxNZpgg+lc/qnitLNXMcRfAwvu3pWnetn5QevFYV4kVqhlMKuR0yOBQ5AooyZfGOoTEhbYnOMYhNNl1PVXRZFtZm3eqMuPbpyalv9b1jR0glW3t1inIwdm9gM4J2rz+HWo4fGuoLDHLqVjFHG7bfMQ/zHUfWr5Xa5HMr2RUXU78zhbi3MaM/Qgj8qi8VRZtUmA+62D9K6qE2erQiRVB3isjxFZltMkjGSVOahbly2sZ3w4BbxWx54gfP6V6tXk3gO5jsvElxLNu+W3KoqJkuSRxXqNnfRXqt5YZWQ/MjdRXXFrY4ZRlvbQsUUtJVmQUUUUAFJS0lMAopaSgAooooAKKKKACiiigCnmjNJRQAtJRSUgFzRSZozQA6ikzRQA6ikzQDQA6lptLQA4Glpopc0AOFKKbThQAtLSUooAWlpKWgZk+IdVOmWSlJFjklOBI3RB3NeaeK4ru6vIL6SY3GUCFyBkjqOR1613njVVfTiHGQEJHHfcK5G4gkgt4YGiJjK4b/AGTjrXNOb57HfSpxdK/Ui0KICzVj0LZ/CusvEntbfdaQ73K4Xb6/SsHQQoigxgYGa7CMllGRxis5blpWRxEGg39+7y35juWcEBGbhPf3NbGj+Gxpk7XDNtDSGTYzBkDFcEhOnI/lXR+THj5kXjoAMVGQoPyQr9cUczDkT6GW8FtZpJMpco6lTDgBW9wOx+lVdDdhK5JOfStK/QJA8spyccegrN0UlZC+B8/TNQbJGzcSkkev1qKRVuYhE8auFJZd3Y066BYA+3pRaMJH2bsN2BpA0Qw2JHyvblh2MbgYqcaRA5Y/ZApbqZDmrfkMOo59RUsYKdQSPc1RDIIdPt7Q5jiVD7Cs7VYllR1xgMMVuFwV/wAaydSAVCaLEepR8NafDFpIkSNPPJYux9jitTQ42XUZnMrOGUDB7cZxVLwyX+xP+5Qq0jMHBOevpWrZ232fVmZT8kqhgPTgg1UfjQ5fw2vI2KSlpK7TzAooooEFFFFMApKWigBKKKKACiiigAooooAo5opKKADNFJmjNIBaKSigBaWm5paAFzS02lBoAdS02lFADhSim0ooAfSimilFADqWkFKKAHCikpaAMXxLGGjtmYfKZApz9Qf6V594jme6vBaxsdrNjAr0rX4Gn0ebZ9+PEi/UGvPbvS3luWvoJA3ljeIyOc+hrlqK0rno4d3p+hJoziM+Vn/VPtrsreXeox3FcBYS41CQkFfNAcA+/wD9fNdhpc28KM1DLibccORk85qXyAoye1ETDA6VHeuWhZEPzEYFLQrcwNRujqkrRRD/AEeNtpP95v8ACrel2SLwSMisXT/tWnNLBJA0iFy6MPemRahq6X+/bGUz/qtpBI+uaReq2O0ltYfIPzHI5xWb9mXJKkf4VCL67uozH5Lwn+Jm4wKgS2YyZiuJ1GcMS5Jb8OgodhJM0be4khKrIdyMSAfT2rUTY65HWsxUV4PJzjA49qW0utsht5flkHr/ABD1FCdhNXLU5C5xWLqcpEDYyeOK15/u9awtWyLc9sigl7E2iyyRaDF5cZdiDkD1ya2NPLtdIH4KIcj0zVLQkT/hGrQfdcx7icd85rR0lciR8cA7QfX1rSCvMzqStTZo0YpaQ11nnCUUUUAFFFFABRRRTAKSlooAKSlpKACiiigDPpM0UmaQC5ozSZozQAuaM0maKAFzRTc0uaAHZpQaaDRmgB+aWmA04GgB1LTRThQA4U4UwU4UAOFOFNFKKAHClFJSigBHRZI2RvusCD9DXGT2jWVxPDMvzHlT/eHqK7WoLyyhvoDFMv8AusOqn1FZ1IcyN6VXkeux5TnbqyE9Dlf8K6ewJGxh3qDXfC11ZD+0BLFJFA4ZtuQ2OnTp3qWwfbErdg3Nc0k1udilFu8To432wmRuABmqU07hfNY9egrQWL7RZyRp1ZePrWTrKXYt1ltLdZio+ZWbBFSXFjPtDOy7FJx+tNFs8lwJcBdowAWxzWNpd7qN/ciOby7UK43LnnGQOB+Ndcvh2QSEG+bG/nCjpVKDY3OMd2Qy2byR5LouBgEHt9ag+zmCMhZFOAOSTz0rVTw6gfDX0uwj0Gc1HLpGnRIourxz+825aTbn0Wn7NkKrDuZiu6thWB+Y9D2qcIbiJiOJE+ZW96wb60Mt7HHo97OG3/O5UFcZPA/Tmt6zsp7VGD3bysRgFgOtZtWNHtctbjJaRyEYLLk+1Y2sc2rZ6bDW3PiOJYwOgxWLq4EkYtwPmlKxgfU4ppambfU2tNsZjpFpE+2ICJckHcTxWrDCkESxxjCrSogjjVFGAoAA+lOrtjBR2PPlUlLcKSloqjMbRS0lABRRRTAKKKKACiiigAooooASiiigDNpKKKQBSUUUAGaXNNooAXNGaSigB1Lmm0ooAcDSg02lFADwacDTBTgaAHCnCmCnCgB4p1NFKKAHCnCmiloAdS02nCgCC+tUvrGa1k+7KhU+2a4bS5DHLLZXAKSRsUYHsQf8/nXoNcB40B07xBDdp8qXEQ3kDowJGfxrKrG6ub0ZWdjodOuDBJ5UjZB+6TVyVRuIzgPyMCuPj1RpYh5bbpV5AzjPpW9p2preW43EFlHIzXMdpSvdPjadm27HJzkdDUtvbTeZ5m9jIWDbi2TkDAP1xxV2RRKuDz6GmrFKgBQjj1oTNObuWBHdt1uWBxjOagudOMjYaTzWx1POKd9okDBdox605XfIEkmF9him5CTa2RFBaR2h+UfMerVbUhBljwB3qHhidvINQ31wIYcE4z2rO4PXcGuQ5LOcg5I+lZdhKNR8UWkecpCxlPoTg4/Wq1/eyW8AffgleMHoM1N4Ytntbi2mlGHmlyR6A5wKuGjRjPVNHd0UUV3HnBRRRQAlFLSUAJRS0lMAooooAKKKKACiiigBKKKKAMujNFJSAM0ZpM0lAC5ozSUUALRSZopALmlzTaWgB9KDTM04UAOzThTBThTAkFOFMFOFADxThTRSigB4paaKdQAtKKQUtADq5Dx3CJGtNwyCjqfzFddXM+MgGayH+/8A0qKnws1o/GjgYJHt5xCWO5fuP0DD0rTgv3tZVlQjazfNjvUV/YjZuxg5yDVFWKxbGJ4GC1cu527He2uopOPlOc81YC73zniuH0+/e0Jd1OzACk9K6uzvleEYbLnripaLTNuGJSOmcUTwqAR2/lVaG7GdqsCQv4mmXWpRRjqG45yfSnpYm7uJIyw5GfXr7VzupaiZ7tISGVSQ3Pb/AOtTNU1uM/KrcvkgA1lWcFxfuFAOTwX/ALo60rDci9HC+rakhx/osLhT/tEentXQtmJ4Wxjy3U49gak0uySC2QIiqqjj1PufrRfD90cdetJsSXQ6g9aKz9F1ZNWtHkC7JYW8uZD2bH8jWhXoHmtWCiiigQUUUUAJRS0lMBKKWkoAKKKKACiiigAooooAyaSjNIaQBmkozSZoAXNGabmjNAC5pc03NLSAdRTaXNADqcKZThQA4U4UwU8UAPFOFNFOFMB4p1NFOFADhThTRSigBwpaQUFgqlmIUAZJJwAKBivIkcbSSOERAWZmOAAOpNcVrly1z4kaMnKJCjJ9Gz/hWb4p8Tf29qNtomnyH7HLcIksg/5bfNyP90frWtrKg+NLpBxi0tyPp89Z1fhNqHxjfsomjwwHTpWPd6Y0cpdEyrcEV1MKfKMikuLZXXB/SuM7WcPLbupKoMj0NRf6baPtUyDJzhea6WXSSZiSQVPbH8q17SxR4hwuQRg7c07idjjBc63Kp8uCXjp2p66Zr9zhTEUU4BLtXocdnCo/1QGO2OtSsm0AKgzT1JucNB4VmiTzJ5AH4yB6Vt6dZCEbEGAxOR3xWhNHl2BDYPc9qltoNrBj2qR30HhNo9uwqjer8hNajDNUruPcjAelDHE5jwZqBl8WahpaymMzo6vtPKsv3WH510PhjxMdSlm0rUNsep2jFXA4EwBxuA9fUVxWnW7WHxY0+5jOBcuUceuVI/oKj8ZpLp3jG7uLZmikWUSK6nBBIBz+prtpNOJxVk1I9corjfDHj631AJaaqy2910WU8JJ9f7p/Suy61oYhRRRSAKKKKYBSUtJQAlFLSUAFFFFABRRRQBjZpM0ZpM0gFzSZpM0hNAC5pM0maKAHZozTc0uaQDs0uaaDS5oAeKUUwGnCgB4pwpopwoAeKeKYKcCTjFMCQUopopwoAcKcKw9T8XaPpWVkufPlH/LOD5j+J6D865a78falflk0+FLOMfxn53/M8D8qdgO31XW7DRog95NhmGUiUZd/oP6nivO9f8WX2t7oFzb2mf8AUqeW/wB49/p0rOuZJbiVprmR5pn+87nJNQLESRhefrVJATaLbSzeKNLSMdJw7EdlAJNd/wCKYDDqem6oowJYTbyH3U5H8zXOeDIV/wCEoUEcraufzZRXol5YDU9IltP41O+M+jDkf4fjWVRc0WjWlLlkmZFswKKRyD+lWygK4xWZYO0Y2t26g9q1VZWHBrhTO6WhTeELJ0yKlhbyuB0qZ0DdOtIsdUIuRyKy570xz1FRpEQepqbbTI2KzoTx1NTRJtXinFBup4UgdOtIdxhFV51+XirLe1RuuQaTGjibqHZ460NhnP2kf1pvxGtiNfeQLxLCh/EZFXZY2n8f6RGh5jl3H6AEmk+ImTqcBP3TCcfg1dOH+EwxPxI88CEZyB7jNdBoPjHU9CdYizXVoODDIfuj/ZPb+VYcibWJwajOQetdJynsWmeM9F1MKq3X2eVv4Jxs/Xp+tbgIIBByD0I714HG5jbnJU8EYrc07WtT01Q9jeSRp/zzzlD/AMBPFKwHsNFcPp3xDPypqdl9Zbf/AOJP9DXV6frGn6qubK6jlPdAcMPqp5pWAu0UUUAFJilpKACiiigBKKKKAMM0maDSUgAmkzSUmaAHZozTc0ZpAOzRmm5paAHZpwpgpwoAeKcKaKcB3oAcKeKzLzxBpOn5FxfRbx/Ah3t+QrCvPiDAuRY2byHs8rbR+Q5p2A7MDPFV7vVdP08f6XeQwn+6zfN+Q5rzS/8AFmr3+Ue6MUZ/gh+Qf4n86ySzMSe/fnJNOwHoGofECzhBWxt3nbs8nyL+XU/pXJ6n4k1XViVnuWWI/wDLKP5UH4d/xrOWInk804RAyJEAAznjNVYBkNu08m3oP4j6VpCMRqEQAYHGO1PigS2j2Ly2epPU0BByWNMRCVI5I5PSkiXMm4846UsrrGPnYnJ6Zyaj85mkAUlBn15NIZ0/g9QPEzk87bQj/wAeFei2rbWHvXnngsbNVzjh4ipPvnNegZwM0mBS1uxEc4u41+ST7+Ozev41VgOQD3rowqXVu0bjIYYIrn5LdrWdo27d/UVxVYcsro7aM+aPKyYdPelUjvxUSnNPBOag0sWF6dadn0NRqx6Yp+c0ybAoPrTiM9zQOlLmgBpxuxjj1qC6mWCJmY44qSSUIpJIGKqWllJrV0HkGLKM/N/00P8Ad+nrSSbdkF0ldkHh3RS9+/iG6yGKlbZPRTwWP17Vh/ETdHe2DgZDxup/MV6DcSBQEUYA7CvPPH98kt9aWflsHiVpCxHHzYAH6V3QioqyOOc3N3Zxk1uXGVyfY8VUKZyCGB962AM89eO1NeJWQHGPqK0IMdlPpz9etSW0wiYhh8p61ams2GNv4Zqt9md224+lAFxlU8gEj+dIm6OUNGXVx0YHBFOihKRBeuOMk04x8Z4yPegRu6b431WwIS4YXkQ7TcMPow/rmuu0zxlpGo7Vab7LKf4JuB+DdP5V5mV7kEZ9DTGQEbgMnvkUrDPbAQQCDkHoR3pa8e07XNT0k/6Jduif88z8yH8DXV6b8RI2xHqlr5Z/56wcj8V6/lSsB21FV7LULPUYfOs7iOdO5Q5x9R1FWKQCUlLSUAYJptKTTc0gCkoNJmgBaKSikMWlptKKBDxQ8scMbSSuqIoyWY4AoFcR4x1GSfUxYox8m3UFgOhc88/QEU0rgXdX8dxwsYdKjWUjrO4O38B3/GuWvdZ1PUM/aryVx/cDbVH4DiqiRhlzTzHx159quwEO0k+3enhD+VTJDhRzU0cR5PFAECQ7iAKsJAN3I6VPFCBk5Ax096kCfTjoaYiHaBwcH8KrzQLMuCCpHRgeQasllbdGmdynBz2pnl/OVJJPtQAyyv5lcw3SNJt6SL3+vvU8100rYC+WuOvegRhUBAA57UmAMYz+NICIrxyef1p8C/vB06+mabKyhuucd+tT2o3SA4zz9aBndeELHzNOknH3luCAf+Aj/GusA+XBFZPgmL/in345a4dvx4H9K3GTjNSwI7aTy32mpL+zF1HuTAkHQ+vtUDAhs96nLu8SgMQMVMkmrMqLad0YyoysUOQw4Ip+0jrWi9uk4Dk7ZBxn1+tRvblfvD8e1csqbidkaikVR15p4PpTjHikC4qCx68mmzOsQJJ6U6Lc7FY1LEelI+ltNl7p/k7RoeT9TVKLlsQ5JbmfawS6zdlFJW2jP7x/X/ZHvXSqkdtAscahEQYCjtTLJbeKARQIEVf4R2olPmOEHTvXTCCijmqTcmRxx+a5Zq87+IaCPxBEcD5oV49smvT0QKK88+I8SefDKQN7EKDjnHPH5mtDM5JcFeR27U9lJUBe9RDBXkYJ71MQcjkGrJFeJWA+U9DUD2/OVIGTzkdanEm1lUggnHFPLeYBjBB9KAKuHXJwMDj5aUDcAQ/GfyqVgpVvWoiuXIzn+dADTEvI3ZHtR5YPIY5+gp4HAOOaUquOhz+VMRVKEZyf0qNlwMHHFXXVT0Uc+9ROiZPy9PegZBDcT2kwntpXhkXo8bEGuo0z4g31vtTUYVu0/wCei/I/+B/SuZKAHGTxTfLB9fzpWA9a0nX9N1qPNncAyd4X+V1/D/CtGvE4y8MwkhkeORMMrKcFT2Ner+GtY/tvRorp8CZT5cyjs47/AI8H8aloZUNNpSaaTUgFJQTSZoAXNFJRSAcKUU0U4UAPUZIrzG5Y3OrXcjMCWnc/+PGvTk6j615fdRGDWLuLPKzuP1JqogNSMR74/wC6xHT8R/OpDEABnBOOfrR8y3exsZZBz2JzjNWGXc3QHHarERbRz8vXpUqIqgc8+9Cxs2PlHrzTwm58HA6dqBC7cKAPr9aUDLe3sKXblt3GPehchSSOT0oAzYeLicZ/5af4VcjRsk4GDjmqiZXUJ1PfB5q6AuST3ApDEYfJtJzjuKgc5xxz71N2bp96oXI+XqePWgBkh+cGrNnktgg5zUEnUe9W7Qd+n4UAen+DMLoEHbczn/x41vMvJHrzWB4VRl8O2jjvuP8A48a6BW3qCOoqSiu8WeRSxKWhIxypqZSrsR2pY02g+5pAV43XcFyAfepX2jqBg9RRJAC24DPqKdkbdrKCKBlKdPL57dQazDdrPfxWaPhpX25Hb1rV1DH9nsyjBBHSvL9Q8RPpHiKCWFDczwyBhAh7d8ntxmuWatOx2U3eDbPXooUiQJGoCinsgKkVS03WLHV7cTWVwkvALKD8yZ7EdjVzcT0rqVraHG731M7cIr0IDy2eKuwp/EepqokIN+7nqFwPxrQXA49KEDBuBXn3xI2qbX+8W6e1d+xzXnHxEn8zU4YV6xxZPPqaYjlY3VlwR6VIAecHtTEGUH9DmnjJHDA5wKskCDuOcjb0x24phj2t8hIOM5zUyt1zkZPNDbSfQBetADFMjRhWIJPtSov7xudnbA705U5TB98U1SMklc88UCFAG/kn3xS8ZA59KX+LheQKcQOMgjnP+fypgNYDacg0zaMYINTDaV+bkds1HhTk9PegCB4l3DGRkelRlNuM5AxVo43Z3Dg5yaiuCIoWZjkKM/lQBTRt0s7DkKQBiuu+G1wVu9QtT91kWUD3Bx/UVyFspTTg7AhnO4/jXT/Dcbtbu3/u2wH5sP8ACkxnRk0hNBNNJrMYE0maCaTNAC5pc03NLSAcKcKYDTxQMkQZI+teW3kok127l5IadyPzNenTTC3tpZ26Roz/AJDNeUwgNJvYEEnP41URFy4PlXNpLjgkoc/59atIMr0681FfoG05GVgTEQxqWMnywcjHA61ZJNwDjjgYoAxuwFPFCthieoHtQh+Q9Du9qAEORn7vHGKXAxyB06ZpQcqOAOetN2nBIGeOB7mgCi67dSQn+OL696ss2cAL2xzzUN5lb62fGAcrx9KlORt/pSGHHKnnnP6dKiYKBzzj0qTBL4AOSBmmEYBBOBmgCJyS44AH61ftVO3k/rVN8bge2epFXLfnPy9qBnqHhRl/4RyyXIzsP/oRrbAGcjisLw/aAaBYuvysYQT+NayO6cNzUjJgoEhxwTzS5KnnpSK4PNOyDQA4GlCg/jTBxTgeaAK88CskkUgYxSKVJU4I9wexrjf+EAgSVre1O2I/M9y/zO/19TXdyN0QdTSKgHA4FRKCluXCbhsZmjeHrHRYmW1jIZ/vyMcs34+ntWn0p5IAplUkloiW23dkbJtmEo6Yw1SnOSe5ptFMQGvOfiBCiXyTZ+dgAR7CvRTXmfj6XfrG09FRR/OjqBgQnMYJ9O9O2g/n1pEA8temT26UA4OR+XSrJHhdq9QRTXUDdgFe1SKQFXkfjTiocEgcGgCMnDD2X1psROMc8npU21W3DvgLTYwoC5I6UALxwc5/GnHGM5PSmsBtxknBI+lJ8pwc5FAhVBHQkj60gUjd1/CnRBQeAenrSgAYPqDigCB+hyO3pVLUn3wiIfelYKKuSufXGKoIxudWUHhIF3H6mgB98RHCkYOcCuj+GzBdXu0PVrYEfgw/xrlbw+ZM3OQK3fAM5h8UQof+W0Tx/pn+lAzrCabmgmm5rMYuaTNNzRmkA7NKDTM0uaBkgNPFRA08GgDM8V3JtvD04UkGZlj49zz+grgYDxjuTXaeNVLaGhHRbhSfyNcZCDx35q0I1vL82ymTnG3FVrUt9nUHGcgGrVqQ0e3HJJqqV8qWRCeN2R+NUItIcBjx9KdkiMZI4yfpTC3ykZx64p5bgLxnHrQIVW+QdBjnrTlIUZ64z+lMGAvQZXA4NSH+IFSOAOfegChqfypBJnJEgJp2ec4PTpRq4U2ZYAgqQenpzQCG2tgc0hjsnt6HoPemHPOemfWphhhjn/IqI5BPagCJlOAcnPHNXoBlSRjkd6p49u3P51ets+VlSMgdhQB6toIH9gWGOn2dP5Vo4BqhoQxoVgP+ndP5VoCpKG7BQF9DT8UmMGgAU9jThRTXO1Gb0FACxHzNz++B+FSKQelR264towepXJqRQQeTQAN0plOc9KbQAUUZozQMK8z8eoBqKN3bg/lXphry7x45fXRGCflA4FHUDFRBtUD0pxX1HHtRj93kHPsaduwnOc1ZAi4GMY6VLGdxGfTnHFMyBnuMUq4Q56YzQIWYlUY7ep4J4NMwAi7e1Ocgqi54LDNOYgA4AOKAGlQMjjJIPHehQAoHPvSggryByKAVy2Ac0ACZDADPt7UkhIxzyD+VLjDZGeelQ3UuByM96AK8rkjOTUWkIJVnnb/loT/9b+VR3Uu22c9+cc1esV+z6eqkbQD69aBlOZEBJ4z6Vc8Kkx+KdNbP/LcA/jkVTnO5yQP/AK9WdDby9f09u4uU/wDQhQB25NNJpCaaTWYxc0maTNJmkMfmlBpmaUGgCQGpFqFTUqmgDI8YyBfD5XHMkyAfqf6VxcPKgkY5610/jeX/AEexgz96RnP4DH9a5iHI49DVrYRpWbfOoOMe4pmoII7tD0DDHH1qK1ZllUZAGe9T6qB5STLxsYE/TpVEjEcbuhOTU5OX5UiqkchLgc1aB+bk/SgCQEE4wefalbA6Z6+lKeTtzgduKTngZH+TQBDfDzLOQBv4cYqpaMXtoyehA/lV+bJt3HXdWZpxzGF9CQfzpDRdVSccnr1JxUeMHrzipl7H8OfamOcd8nJGAKAIwTjFW4s+U3OeM/WqikZ9D71bhGYj1PGKAPV9DfOjWQ/6YJ/IVpCsjRRjRbBx3t0/lWqrZFSUPozSUtABuprDcjA+lOxQeh+lAEijCAegpaKKAGv2ptOftTaAExS0UUAIeleUeMJN/iOXqcMP0FerN9015F4mO/xBcHvvP9KOo+jKgIEYGad/CCO+KZtJThs/WnA88j8uKogfgFWJ6Z60qKpQjJGaBnywB1NBGBzxzTEIxJkReoGTmnkAlscZGeO9RnmV2Ofl45p+4YGOhGKAE2/KOM84pCOmAD2pdwAPrxTWk59TQAspGM8cDpVGeQEgVPJIRG3p9KzpZCxBoAZLiSWGH+/IM/StrUCsShQwwvHHHasnT4/P1VW42xAHp3rT1Jcu3BzQMyZJRyevt6VY02cJqNtJgEJMh/8AHhVd4ix+UHk0RoYZE7ncKAPQiaaTTSaTNZFCk0ZpuaM0AOBpQaZTgaAJAalU1ADUiGgDk/GcpbVraPqEhzj6k/4ViR44IOO/IrU8Wnfr4/2YUH8zWbFwBzznvWi2ESwNiTOeOfetO4Tz9PdCcgjFZkeA+cYGa04jvgKknp3OKYmY8Eu4DOc98GtOBxsyQTzkc1jkiK7mjIzh8/gea1LZ1kjAIxQDLY29DuzSDHA6YwKUjKjAPX1NNJbB+v8ASgQ2QK0PJ7E1l2ACzSrno/8AMVquWAbhumKyIfk1CUc9jikM0cKozx179qRyzdMnPcU7aCSRjjmo5OSvJ96AI8Yb8auwj91nk5zmqe07jx1HarUOfKwfXvQB6toI3eHdPP8A07r/ACrQHFZ3hnnwzp+f+eAH860yKkocKWmCn0AFB6UUUAS0UUUANem05+tNoAKKKDQA1+EP0rx7XSW1ybHPznvXsEv+rb6V49qx3azKP9tu3vQtw6EX8IzSEZGOvalO4ng5/Ck/iGeDntVEkoOAvB9xUjA7QMA1ErZcbueOvSpN/BP3eOp4oAZHjy3bB+Zj2pCTjPT8KcmRGue4zULDg4piH9dxJxx6UxjgcE5xxxTgxLDr17UyQ4AzkZWgCpcSHY2T69qzmfn0H1q3cuAhUDrWfMflKjOScCgZt+H0KwyTsceY2Rz+VT3nMjZI644FWNNjSHT0BY8AVTupdzNz/FwKBFQEKp65zUJyWBA71IR1+uaQAbO/WgZ3BNNJoJppNZFDs0Zpm6jNAD80oNR5pwNAEoNSIahU1MnJoA4fxE4fxDdHP3SF/JRVWEMSD70upSCbVbuT+9M386bFwF56djWgiwucoMd6uIQdowRx6VSQ52Zq7G25Bg4xxyaYjI1NRFqYOeJE/UH/AOvVrTzlMHPWqniFtksMu77rc49DU2mnnk96A6GwcbgT0AobO3FIQCueuPTtSnOCQc80CG7jnk/XiseU7dTHAwykVqEtk56/nmsm7IS+ifp83b3pDRqDDLnjpimleOfrzTojhVBNIQAoyOenNAhuMkAc9sirEC4Ug9x0NQOTnIPcEYqWFW2k88daBnqfhU58Maf/ANcsfqa18VjeETnwvYe0ZH/jxraqShnenjpTTThQAtIR0+opaTrj6igCWiiigBj9abSv96koAKWkpaAI5ziFvpXjt8Q+qytkfePX6mvYLo4tnP8AsmvHZsNqMh6jJyPxNC3DoI68EjtTkA9CcDPNIwwOR+RpykhiA2exFUSLGuXxk80k4KqSMelSRKAc9PpUc5Ke4yCe1AgchOp44FQE4HBPXFK7SMjADHuaiCsXO5z+ANMCaM4UHJPTmorlvl69M0hlEYA8tmwOp4/GoZ3dh91VOe/NAFOQlkLdQO+Krwr511EnUZzU91K4QoWyPSl0iIy3ZcD+IACgZ0yqPswGSpHpWTOw3EL61oXDusQHfp1rMYEfzzQIiY4B680gYZxj86H69KYpIfgcigZ2rNTS1IxphNZFDyaAaZmlBoAkBpwNRg04GkMlBqZGA59OarqaLiTy7OeT+7Ex/Q0wPP5GLu7sPvsTVmP7gw3THBqqvVRnPAq2mOc9eK0JJEjxtI/vCr8AbYVIPJqiijK8nrV+EP5OC2M/rTEzG8UIBbgA8jNN0lxJEjbh8wB5+lN18OwYk5GOtVvDkm+IIesbEfhSGtjp13nJUKePWnEEJyPyNNUqF+6OR7058enamSRbfvctjHfntWRqQI+Yc4IraZQDnkcelZN+u6NskE54pDRoWuGCHP41I4Qbh1weDVLTH3QoSORgVdbgjBAOPTNAiLOSdo7d6mgyxILHp2NQseB35xzxU1vgHOecUAel+DGz4YtPbeP/AB41vVzngg/8U3APSSQf+PGujHSpLENKKDQKAClHUfWkpR1H1oAkyB1oOD0pMA0tAEb/AHqTtTm+9TTQAgpaQUtAEN5j7JJzj5TXjnBvZDtJGeDnmvX9SO3T5z/sGvH0+aeZiQCW5prcTJAckZ474Ip6dOQCMc0wFgx4I/Wn71JP5e1MkeoXoMj0pkp3uSSeAe1SqFA4OD9aqyjaGZmA7cHrQASKgOM96aQA3Un8aga4i3AKdxwOF+b+VO3XDtlLcjvmTCD9aYxZEXJJBxjk1XuWwowOakYttyzxKAOgyxqrPOOi5YjvjFAFC5yQSeOeK0dFjKFGA5yeRWcwLuMngc1p6U+yQfKM5Pb60IGakiu+Cc4Hb8KozIQucH05rYRSYQensKzpxnr39aYiiV4P0qIpjmp8Ek57DHWmSD5P8KQzq2NNJoJppNZFjs0oNMzS5pASA04GogaeDQMlU1HqRI0i7I/54t/KnKah1ZtujXZ/6ZGhbiOJjAZwfSp9wEmM/mKjjXjOOtOcgkHgVqSWo8mVV68545rRHEYU9PpVCwUsWmb0wKuLKTg4PA45piZi64f3ZA6Y9KzvDRxLOucYIP8AOtDW23ZyKzdAOL2ZR3AP86Q1sdamdoOfapCSc8gnGOlIjbipHTPNOK7ifTPHFMka7kjC+nSsy85RsjP1FXyMAc/nVK6B2H60DINLf5GQc81sN0UnuMcVhafIUuWXsRW0CWjAz09OKQmQsBhupOR/Kp4iN3AHTtURGWPAAIp9u/I5JPoBQB6L4GfPh+MHqJZP510wrifCNwYtA3g/6u6cEe3H+NdpG4dAwOQRmpLHUUUUALR3H1pKUH5h9aAJKKKKAGN96mGnP96mmgApabTqAM3X5DFo1yw6+WRXk8JBlYdga9Q8VSeXok/uAK8vtz8zn6/rTQmSgDrn35FOGdnQ804sgBA4+tOHJUCmSISixk4wOlUSiBi5gDE5OXGat3XEYGOWqnLJtBAbvzxQMbJcuq4Hy+y8AVA0rbj71FJPubkkU0NuPGeOtACksc5Jx2GKjlIxgc1NtPU5xxUUqgep9MUwGW4DSbW9fSrXkSW0nmqMru+lUgxRwR6jrXTWscd1aYI3fSmDFsLpJYlXB44xmoblcvkDHPrQ9m1rMHQ/LuqSXBycUCMogB+nXPWmuSw6AVYlQCQ4HB96hKnGcdKBnSE03NBNNzWBY7NGaTNAoGOBp4NRinA0ATKara223RLn3UD8yKnU1S8QOF0Zx/edR+uf6ULcTOWUkKOcY7Uz5pJFTrnpQWHPNT6dHndMcdMCtSTShUIm36VMCNp7dqrADBIAxUg+4cEjJ5waZJjawSzsPSszQv8AkISf7o/nWlqoIzk1laM2zUmHqn9aTKR20JJVc8jOMGpeAuG5PXpUFu67OccVYCxtuIHQ9c0ySCQqV7d6o3IGDhu9XJAF4+YDB/nVGUDJ7j3oGihAdl4hJ4LfzrejJMZOMcdzXPTHY+4DGOeK3YG3hcKcHvmkDA5J6dDinRbix69MinMCD2GaSMbpAecGgR0vhmZYtFnUnrdH9Qtd5YArZxg+leaeHHMkqWY5BuC7fkBXp8IxGo9BU9SyWiiigAoH3l+tFA+8v1/pQBLRRRQBG/WmmnP96m0AJSikpaAOd8auF0Vwf4mArzi0PyE4PX0rvPHswXTY4z1aQYrhbYDbg5AxTQmOU7n7MOoqYLyTkjjAFMRRyRg1KmRjqO/WmSQXXEqrk4A9KzrgE7mPQdzV65cMzvx2ArOuHyG57UDKpUlsA5/GpoImk3EcD61GvzPnOKuWxCWj8clhzmmBG/GeR1qtK3P09aslcLkHknPJqpMADyaAIpcBAccjHeuh0mUpbAkkAewrnZj+7A966HSYfOsgo/nQDLxvkIC4Gc9cVXZy7EDAGfSkewIAIx70gVk4IzyaYircKwxk8j2qswwDk9PSr04DAkHt6VRc8cDHHPFAzoCaM00nmisCx1KDTQaUUDHCnCminCgCRazfEzY0pB6zL/I1prWV4qONJQ/9Nh/I01uJnLDMkiovUmtaJNqhRjgVQ0+Mb/NIHtWlEeDkHkVqiGSrGdrDP4CpChWPoPxFNjfJPb5u9SsBtAPPbNAjn9UH3uKw7Fimqx4/iyv6VvamFw1c5E23UoT/ANNBSZSO4tC2z6Ae9XYpMEhlBBHpVCwY7D9O/wBauK57daYmJlSBnj5f61UmQqTgkYqzvHAOeAKrzcdOMg0AZU6nnoea1tPYNaxsRnC469xWXcEgHjvVrSpAYnU9mz+dIGaMjhXJBAwTSR/M44Jp23vtHTqaIiQ/OKBG14Lh8zV5HI+6M16ZH92uA8CJmW6fHRgK79OgqSx9FJS0AFKPvCkpV+9QBJRRjNFAETn5jTaWT72abmgBaWmg049KAPP/AIiTA3FjDnq5Nczbg7Mk4xWz4+ctr1mqnJVScfgaxoc/ZjjPpTQmOLk985NSlgqZ9B1zUSrhskZxU0yqls7YOQMc0yTPfOSd3B6VVlXrz1FSyMNxxjjiosZB5xxTGQhcHr1q1AVWMnOfm/pVdBlsd/WpoxmA8H7x/kKAGyt6dqqSdKsyAZPGOetVZscnj8qAIZjlgCO9dFozlF2+1cy5/eJz/FXT2EL+WrKCeKAZpEgouT36VBJCGYncD16VDJcEKqZH6mmpOWfoaYhkydck9KozjBBzkVpSfc+oqjcKflz2oA1yaKbmlFYGo4Uopop4oAcKetMAqRRQA9ayvFaltKiA6mYfyNa6CsjxJcKI4bUYLE+YfYdB/WmtxMx7dVjVQMEYxUygADtUSlSF5wfWpASM4PStSCVWJPB6nvVjoM+X09/aqZcjt36irm4tEDlsY4oEYWpDhsrg1zEjFblWHZwf1ro9SbOec1zcv+uX/eH86TKR3Fkx4xnvV+MHOCeegrMsmA69M1pRKGYENgZ6UxMbGc4UnJI55qK4XOee9TRqT79qhnHB56nvQBnTjCkEdT2pdJYLdMueGX+VLMpwfrVe1Yx3kZ6ZOM/WkM6HbtzxgY4yaagBYe9ID8wHtSgN79ex6UEnW+AU/dXp44mA/Su4XpXF/D4f6Jff9dx/6DXaL0qSx1FFFAC0q/epKVfvUAPyRS0UUARP941HUj/ephoAQU5j8pptEhxGx9qBHlHjObzPFirk4SI/yqtb58pfc55FJ4mfzfFNwV6rFj+VLBuEa89BTQMmVfvHrk/WoblgFVM/xZIqVckA7c9+Kp3j5n2qfugUySq/LHgntUTcHGPWpmOGyf8AConOCOc4pjISSDntUsDYt+p/1h/pUTZI4p0bfuQccbjQASNk557cVVnOAMZ5POasSHg9jn1qrIeGJ6AUDK83DA+hrrbDcbDzIycn39q5OQB1OOldP4bnJgMZc4FAmQvFJkbs+tKqMjdB09K1pgpUggmqhh3McAnHfPtTEQZOwDbnPtUbhmAyuOelWWXauMdOlQEZGcHFAF6nCkpwrA1FFPFNFPFACipFpgp60ASrjqTgDrXGX14Ly/muCflJwo9FHSun1aY2+kXMinB2YB+vH9a4lIjI4wcfjVRJZeRxtPPHSplIbPI7+3aqiW7oSrZ9qtIhXls44rQkcYe4wOlXQzJa5b04yKhhG9uh2ryaj1G5CRiNTn1oEYl+xJNYU5/e5962Llt3tWNccSGkykdfAfkz6jrWlA33CCKy4G2lQRnI7ir8D8AZ/CgGT25GSckEHp+NJJnkY3AVHGQJHX/aJwO9Pdgcnp7UxFObBQcYrObKNu5BBrUmXKjBPvkVnTg56Uhm9G6mNWGT9P8APvUik54AH4VV05/NsVPcLj8qthScnJ6elBJ1vw9bNpfZ/wCe6/8AoNdotcP4AYJDeDP3pl/lXbp0qSkSUUgpaBhTl600U5fvUAPpaSigCN/vGo6kf71R0AFMuW22zn0U0+ob04tX/wB00CPG9Rk87xLfn0IA/P8A+tV2EYU5APtms+RQdTuGK5YyAH9a0ETt0HTpTjsD3J1QZ7jHFZcy+Zcyt1yxFam9Y1Yhh0JIrLWRQ3Ixn3piIZBhvTFVm68diamZtzDkGqzMd3FMAONtSIcW6Y+UZbpUDnAxg+9SqR9njz2B/maAI5TyearSkLbyH24qV2wPSqV4+20fnnpQMW0bzYAc9R61r6PKYLsLuwGHTFYmlZa1/wDrVqoNhjdex7GgR17IHQMCDkZ7etRFMP69DwKbp9yJkUEfwnNSXU8Vuqs54NUIZ5QbHQ5PTNMmjWOIf0NMTUId4xjk1X1LUo/L2rtOTSAs04UlKKwNRwpwpBThQA4VItRipFoAq61GZNEugOoTd+RBrl9Pg3OZGHToK6q+v7OCKSCZ9xdSpReTyK5dZ7a0jxJLn2HFXHYllqZ8HZGpd/QdqdHbk/PK2B0A9KonXYEUrCmc/wB1artqV3cH91byn8Ksk157uOMFU79hWc8bStk56VAIdUc/8ezD608W+qKuTBjBxQBFdWmxCTXPXfEhAroLj7SI285Mcda52Y7nNJjR16R77OCZc8ov8qnt5irgH1puiN5ujQf7mOvpTpYGjckdjTESyMFuG444OO/SnM524HpTJNkgB+623P5GoyMgjvigB7jAGcDgVQuRyO9XWzjPXj61Um6cjt2pDLmiynbJGWxzn8DWimNnO44OKxdLkMd2P9oY5/OtvPD/AHuMH0FAjpPAikw3fb9+Pw4rvUPFcT8P0/0G6f8A6eCOvsK7VKljRIKKQUtAxaVfvCkpU+/QBJRRRQBC/wB402nSfeNMoELVXUWxayf7tWqoaq2LST/doA8ikH/Eyn/661obhlQVz9KpS/LeysO8lWo13nI6AYpx2CW4XD7bVyM5IwPxrM3cgdAD+dX9QIjSOIHqSTg+gqn6ZPJNUIgduRzjJ7VEwJfnjJqVs7hwDTWAwM54PagCE8Y9R706RsRIBwNooZRj6VHM+UX2AoAick/WszU2224960G54rO1dSYYR6vikMtaYpSzUetakJ325HpVa3TZCoHSrdpkZHGOnNMRf0+6Me3D9D6CrOqxm8hjkRzheozVCMDGOPyq9aOrb4iFweRnPFMRhzGS3JySMVRkuJZTySR710t3Zq7HeM8dSKyptP2k7RQ0O50lKKSnCsDQUU8U0U4UAPFRXtx9ls3lztPAB9CalFUtdx/Y8pPZlP60LcRz8sNvJl2uwMn1zUPk6enCq9w+ewwKI4Y2OSM5NaNraqqb/Y1sQVsi2iWSYR2qt9wBNzn3xURv7R+DJqLr32KFB/Ktvak6KUZGdBja4BqN3mjXaYgijn5RTEYrT6Op5/tFfc1LFqukW4ylxdFh0DCtVpYXUb1BbPORVC+it2XcqIOfSgZjazrqXKlLeNgp6sw61zzSZNat/GBnAArHYYNSyjsfC0+/TdmfuMR/Wthxu/h5x2rmPCUpzPD24b+ldRjJPoTxQiWQlQAeOg5qEkK/XAxV7AMRwM7jyOtVpY8jHtTAaRleADx2qrKu4fQVOuVH/AetQOTzjHSkBWRjDMr8jawNdISNjFQPmXrXNye/pW9ZyrJp0bHlguD+HFAM7X4fD/iVTt/euD/6CK7BTXJ+Ak26GzYxuuH/AJAV1a0mMkBp1NFLSAWnJ978KbTk+/8AhQMkoo49aQc0ARSDJNR09j85FJQIB0rM1hsWkn0rSPSsfW2/0V/pQB5hNkXbHsXNW4pTjAH5Gq118s55wSxIqWIokXmvyB8xxx0FNbBLcqajLvv2GPuLt/HvUG7pjGPemAszl2OS3PNOwOOtUIaeufzpHOSOvBNSbWwxAHHrUErDn5u9ADHfC5qCXqAKex+QZ/MVDISZM4NAxDnkCql8u7yM4yH4HrxVoevNQXS75rY9gx/lQBoDiNeOwpUnEb/d68/SlcZiRo89MH2/zzUElu7jIYg0Aa1tOrgHuDVqMlZOe44rl1e8tm3Kpde+BV201tGcCX5WzyCKdxWOmePzIweM7e9Z04KZO3OKuWlysqDawOOtNuYhgEdDkUCLNOFNFKKwNR4pwpopwoAeKoeIDjRpB6so/Wry1Q8QnGkn3kWhbiZzMDgYBx1rat2CQ8rkbcVhgFpQqjrWzEqpCAw524rZEMlKW7spD+Wcc81ath8u1pFdar+XHIowozj0pq27RkBRgHPamInlsopBlD0rNurI7WyentWtAjqoyRimXT4jdiooA42+ttozzisKYAMa6TV5AG2j0rmpjljUspGv4aOy4kcdyFrso9yrv4wBjFcdoY2QCQ95K69WDIi5xgbjQgY4Yxnbg9B9ajkyM9+wqYcnjkD371G5IcZXt/8AqpkldlXB7duarOo57e9XpB8mOo+lVXUZPbNA0UpRgHFaWkvvtpoTzt+YD6//AKqoSqSen5VJpkhjvCuRiRCv9aQz1PwQuPDUJ9ZHP610q1zngn/kWLf/AHn/APQjXRrSAkFOFNFLSAWnp94/SmCnofm/CgBxXJHOMU6iigZXk5Y0gpX+8aQDigQjHisTWm/0dq2n4FYOtN+6b6UAee32VnUD1JqpfzbbdIwBmQ9RxxV/UkKzR+9Yl9L5t1/sp8oxVLYHuOU9OBntzUgBIH1qCI44GaliOVz9PrTESOVSNjnJ6DAqmxLAnvmrMnIPaoJDgEbhQBCe2O5qJjz+NSF/mAHOKhJ6eooGKBmnBNzJ7H1pq81JkKuT2oETxxnP3gN36VbECRsMnP8ASqVrIA7b+QR3NEl5u2hWxxTAeZ/9LCIAEU9KvPpdpqKN5iIjZGGBwayVALF8963dLkV06Z5GOtAMwmgvtFkJGZYAeoOcCtqy1CO9iwnX2q82wxsrxhhzxmsTUdIksX+22IYJn5o80CN+lFNpwrA1HU4UwU8UASCszxIcaWo9ZV/rWktUPEK50rOM7ZFP8xQtxPYwNPiLuXzjmtTO3H70jjFZ9q+yLaAQTTm8wtndWxBdFxtRQXzj3qzasXUuXwMZ5+tZcMTMwByc1qmPFuI1JGcUCGyXJaVUVs+4pLlW+xM2OCKfBBFExLMCwB602/b/AEQquMd8GmBy2tJ+8JA6CuZm4aur1Bd3mZOetcxNHumCD+JsVLKRtWaGKziXodoP410do26Evg59fWsQjYMDoowK1tLYNAAex57UAy6ThAMdfTrSIHPAIx9OlDZOTw2OvOD7CjOFAJGO+aZI1pMv8wqJwM+wFPZiBk445NRM2UPGM+tICrcMkURduFUdRVdJNk0TgFcsOCMGnXY82Nom+6Riovt7PZWtjLEheK5BSUfe2nAKn1GeaTZaR7J4Nj8vwxaAj729h9CxrdU1l+GwP+Ec07H/AD7rWoOtAiYUtNFOpALT0+8fpTKfH1P0oAfRS0lAyu/3iaRTT3Gc1EDzTEJIeK5/WjmM1vyHiub1x8RtSA4rWSVkSTsE4Nc/cNvbf0PtW9rrf6PGc4ySP5VhS/dBwOtNbAxFPA71YjXA65/GqqH3q1HkpyTjFUIcUyDx0qvL8rHLDrVt8FSG6n17VQmI3H60AR92OexqPuBUgO5j24pmOfWgY+Nc4606cAQNkY4qSJO9Eyhlw5IDcGmIz0V34VuKeqZbbnviltozDNNbSOGaB2jJXvtOM1dsodzDIzxSQDYbZmQHHB5rc0+IW6EcnkdqbGirCAinp7VON4JBVucZ5FUItBVYcr+lB8t0dWwRnkH6VDFMCCDuHcc1K2Sj5LZ9ce1AhlKKbThXObDhTxTBTxQA9apa/IE0eQHq7Ko/PP8ASrq1ieLZtlpbRA43Slj+A/8Ar0LcHsZqYEYO7FSGVRwCST6VXRsoAKu2dtvYyNg4962My7YxgBWIIOaurKjLjLe3PSkQAEYAAGR1pN8acttHXrTEO8sNuYFuB61TviBEyg5IHpU6XSvIV4PTpUF70OeOOKAMDUiAz4GK52ECTVIV6gNn8q6DU23b+aw9NUvqhb+6pqWUjZcdOKu6Uw3MhOD1qpIOKn01v9K5Gc0AbbJhcMOnJI9aiKtk4+ZR69akY/JgHk/yqKQYBBGaZJCw82XoV5zg9Kc1uz9Bx7VLCvy89+o61MMKCTwelAGZPbhfTjrVQ2kbXETFfnVs/lzWldewz9KqRR+dcBFzk8DPqeB/OkNHsmgxtBoVhE3DJboCPwFaQqCFfLjVP7oC/kMVOOtIZIKdTVp1IBafH1NR0+PqfwoAlopM0UDITUT8NUtRyigRDKflNcxrjfK1dLLytcxrgyjUMZx2vL/ocbDs3asRuU610d/GJrBlI6cmubydhU8Edu9NCe41cgAdMVbix5XJHoKpL1H1q7Fny+D34qhD5Sqxt6ms+ZgCc9atzNwe/rWfK2W46UAOjPDMT2pIxlunHvSRgmOQ88AVLCnfIoAtRqxUY7CmXAAXrkipk+59KiuCCMdfpTAwYbjyNQmVyTuc8n3rbtmyFIJwQO9c5qKlL847gHituwkb7OpPpSQ2abSuqHacDFSW8szDqCTUMKGVwgIGTjpW4AtrCFAQnGc4pklSMSO3T8h71oxqoUjnsOQaotf7SfkUEj0oiuhJljgEnt9KAJxThTBTxWBqOFPWmCnigCRa5rxW3mXUMeOEj/Un/wCtXSrXM6/zqrZ6bFx+VOO4mZls4G0E9K14rnyouAT+VZHl7GDAcE1pWrZ4bkVqSyydTK5+U/lVY3VxcsQDwe2KvR28TqTgde9LAiIwCvznOKYhbGzaNRJITnPSoLyTJJPr3rSdtseM564rIvTvVgCeh/woEYV5IWU+9UNGXN1O59hWheRhIyT6VV0aPZG0h/jbP4VJRpyr8ozRYHbeKMmlkGV46e1R2xK3KHrg9qAOjQB/nbkDtUMo3v8A41IxxCADgcHiooyV57E9qCR6gDAJ4/z3p8rZ7ZHT1+tOj2bc9Sf881FMNoLAfSmBVnBIz1GPyqfwzAbnX7WMjKtOrHjsvzH+VQTnC4brit3wFa+Zq7zkZEMJ/Njj+QNIaPS06A1KpqGP7oqZelSMkFOpo6UoOKAFp8fVvwqPNSR9D9aAH0E8UhbkgdRS9V/CgZDmmycinZ5pG5FAFZx8tc5rSZVq6ZhxWLqsW5DQI4s4bKHocg1zd2hinI7HOfqK6a5Xy5yO1ZGrwbiZAP8Aa/xoQ2YxznOeKtRPtjOBVVjkcVIn3OvWrELPJ1IHeqLkscVPM3JAPeoY13PnNAizEg+zyAccD+dTW6Dp7dakRVC7NpOVP8v/AK1Pth0P4UAOH3cevNVZj29/WrMjAbs8YPeqlwwwSD70wMa+j3Xkeecr/WtG3G2PHOBVGdw17EMcYbk1owjAwaQy/ZTKkoJB4PrW8GV1DMr89Oc1zEbFWB5OMV0Fm/m2x+XJBxyRTJY+SKKXkFgT7VUe3CZ5PWrb5QDIwfQHrR5ikfMD+dACjrThTBTxWBqOFPFMFOFAEq1zviWIi9ikwcSR449Qf/r10K1l+JYw2nxy90k/mP8A61OO4M5tZQo2sPpxVmG4RP4lqJEWUcdT61etdLi2iSQA98VqQxFvJJcRWilnPU9hUqTRaYpZ3824IxgHIWr5iiSzMaN5Y7lB1qliwiYHyHcg9zQIrm9u5z8sRxSSicRkclyBnPap2upGAWJPLGe1QypMXbezE4zmgDM1Pelq5fGQKLGAfZY1ztYKMH0NVtXmUqsAOWkYA1pWqYTPYCkMidmiOGHH94D5T/hTEYeYGHBBzirci4TBrOmPkfMOVyPl9/agDpVPmopDAggd6kCAHIFVbQExKevbIq2rsFyMHceAeMUyWOYADBPPrULlh9OwqRm3eoOOnSoSWJJ9PegCrOTsCg5x0/8A1V3PgO0EWmSXBXBnk4+i8fzJrhnHmSBhzt9T1r0/Q4VtdPtoF/5ZxgH69/1JpMaNpOBVhOlQJ0xVhBxSGOFFFFIAFSRchvr/AEpgFOg6yf739BQBLtAbd3pCTg0uaRj8poAhPNIRSmkzQMYw4rNvo8qa1DzVS5TKmmI4PVoSkucVlXI8yHOMkc10+s2+QTiuakBAKn6c1OxS1ObuE8uUr0APHuKAxCcKeKt6hCNm/qVPT2/z/OobWPzE5/AZq0SUmUsM9s81JBGd2SSKsywBRjHQ9qfFASDtG44piHoCJo1xgbsfnTFkEasGbBHalmt72SQBVVBgEZ5J/ChNJJy88hJJ5z/hQBWM7SsRGpdj2FPFoX+eZ8AdFBq4Uht1IjTPoT0qtOxOc+tMDH1NgL22wNqfMMDpV+E4x3+UVn6icXNuTj7xH6VcgcrtBPUDrSGWmXdjjjHetfR2+Qq30+lZiDcM57Vc047WYc9O9MRfuEzjaO9NU7RyxFTuqywEgHOaq7jt29PXigRaFOFMFPFYGo4U8UwU4UgJFqhr67tHk/2XU/rV9aqa2f8AiTze+3+YprcGcxYYM4BGa6L5BEACBwM89a5u0JEmRwOa0pBLt3I2RnjFbIzZcMcqPlGBU9Bn3qdNrgCSNc+tYrXF0uMk8d8U9L+bIye1AjYa2i2kqq5B6CsrUy8QZV9cVbtp3mOSM+tU9QOS3p2BpgcnIpfVYgxyc5rooV+QAdfSuclnSPWVZj8q8H8a6WAhlyDkDpUooWQE9PoKxroiTUYoccRje317VuyqAhJIAArAs/3881yf42wPpQB02m826nkcde1XNoY5IwTjGBVPTQBaL82CeKu4KoTzwMnBpkkMq4+XII7gio3+QEZwfRqcSSxyQcHNMb5nIPJoArzv5MLOB8w6fWvQvDN+LuzjfPVQa5P+yDNoE1yRne+I/ovU/nn8qn8E3xQtbMeUbgex/wAmpe5S2PTIfmFWlqpZnfHuFWuaAH0tMBp1ACilg6yf7/8AQU3NOh6yf739BSAlpH+6aWmv900DIc0UGkoADUMoyKmpjjIpiOf1SDcp4rjbyLy5iOxr0G9j3Ka4/V7bDE9KTGjnJFDMyMM55x6+oqhaIILho2Y4/hPqO1aFzlGD91Oaruq586MZx2HYf55/OnEJDp0BGQO3p1pkbN0A56c1OJt6A9PX3qFsAkqT9Kogls3IDQOwMijeuO47j+X50M6uD396z5bj7Ldw3BPyI2Gx/dPB/n+lXZlMUrJ78UARyHco6cHHFQSjg4z0qViVzkdPSoJHAyD+dMZkalGXMeOoY1IjECM55xg/UGn3YAMZJPDjmh4+hPGcmkM0Ldhwck8VdtSBJg9wazrR8Dr2Na1lEJHHB+uaYmX7fc1sxxxULoCCcd/XpTpJhFCIkz6HmowWMfIyfpQInU09agBqVTWBqSCnrTAaeKAJBVDX2xpRUfxSKKvCs7xAcWUWc4Mv9DQtwZh20fU46d6tqxRRyAM4qj56xDOO9In2i7kEakKGNbEFyS4M0qxRrvY1eWzijYNPhe5CmqqxzWilbKAs54Mrj+VVXsL1yWmukB9C1AjTmuYwpSEjFYd7fBixz04H4VMIJVRkBDs3cHgVVl03acySD1AoA5khpLv5vvM9dJbvJEoZOncVlzWyR3sYU5JbJrYhxsHFIYt7etLamOKJhI/BJ6AVXgi8mBU7gVcYA9OvpUL46daAN3TgBbJnoBTb6/FvIYd22RlzuPQU6wysK5XIHPFM1GwS8aOcDdIhyVJ2hx6Z7exoewupkC8uYJWMsxYAE4IyD9P8/hWtas10UEPLuQqe5PA/U1j/AGe63tELRwWyu5l6D+X5V2fgjS1fVI32/JZLvJ9W6L/U/hUq/Up26HYS6TFBpUdkgysUYT6+p/OvO4kfSfE2zoshx/hXrJUMuK4TxrpRjZL2JfmjYHiqJR22jy+Zaqc1pVzfhW6E1ouDwQCK6QdKQxKAaUim9KAHilt+sv8Av/0FNBp0HWX/AH/6CkBLTX+7TqbJ92gZFmikopiCkbkUtIelAFS4XINc7qlvuU8V08gyKyr2HcDxQI89v4ijMpFZUIInfDsAQFYE8Y7EfjXUatadSAfwrlZ2NtcCRh8o4YEdRS2K3Q9yY8gnGOOM8Gkjl3Z55qxKiyIAWJBHX19DVBt0TlScGqJJbiNZ42Q4IYEHinQSmaygd2zLGPKk5/iXj/Ckt8FyeWJ4HNRywugZoWVXbG4EHDUwEnmweDiqMtw0jFUG8+1TizMhDSybvZeBVpLUIoAUfQUAYd2JQYdx5Mgyo6VekGHUEY+QVLfWyAwsOFEg/kaS5GPmTnaMGgBIAQenrXSacP3JPGce3Fc7ZyCTOOo7V0GmyAgA5Jx2piZKtquQxCn5qkaJEUgIuBSzMsS5Y454qlc3wVCVb6HNADlNSKe1FFYGpKpxUitRRQBKpqhr650otj7jq39P60UULcGcwoBbJA4q9aRg4OM0UVqQWDCkild7/TdU9vYKvzGPPGf0oopiFu90dq6phW28HHtXJahZ3KSboi8h9jnNFFAFG0d570FyTsHet6MDA5xRRSGPJ696hYHcPrRRQBv2qEQpj+Ic59Ksggjc3yhePbNFFMkryOked56da7rwrZDT9HRnGJrg+bJntn7o/AfzNFFIZvowPeq2qWSX1m8bLnIoooA57wozWdy9nJwY2Kj6dq7dTkUUUhjqSiigBMU62bLzKezj+QoooAmpkn3aKKQEdJRRTEFIelFFAEbjiqdwmQaKKAOf1K13KTiuJ1ez2lhtoooGirp8m+BoWyXi5A9V/wDrGiaFZ05IVgeD/jRRTQEcWQSG+Ujt0xUzgE/rRRTERqAudoBbuOxqZDuHt/KiimBnarMEiyCMAg/SpbOLzxtHI25J980UUgKZQ21864+Vua29PkbeuMcHmiigGT6okrspGMY4ArImdkQqwxRRQCP/2Q==";

/* ═══════════ SHARED UTILITIES ═══════════ */
function useReveal(t = 0.12) {
  const r = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = r.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } }, { threshold: t });
    o.observe(el); return () => o.disconnect();
  }, [t]);
  return [r, v];
}
function Reveal({ children, delay = 0 }) {
  const [r, v] = useReveal();
  return <div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>{children}</div>;
}

/* ═══════════ ICONS ═══════════ */
const Star = ({ s = 18, c = C.gold }) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const Shield = ({ s = 28, c = C.gold }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const Home2 = ({ s = 28, c = C.gold }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const Dollar = ({ s = 28, c = C.gold }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>;
const Trend = ({ s = 28, c = C.gold }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const Check = ({ s = 20, c = C.gold }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>;
const ChevDown = ({ s = 20, c = C.gold }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>;
const Person = ({ s = 28, c = C.gold }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const MapPin = ({ s = 18, c = C.gold }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const Arrow = ({ s = 16, c = C.gold, dir = "right" }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" style={dir === "left" ? { transform: "rotate(180deg)" } : {}}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const ProductIcon = ({ type, s = 28, c = C.gold }) => {
  if (type === "home") return <Home2 s={s} c={c} />;
  if (type === "trend") return <Trend s={s} c={c} />;
  if (type === "dollar") return <Dollar s={s} c={c} />;
  return <Shield s={s} c={c} />;
};

function GoldRule({ w = 60, center = false }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "16px 0", justifyContent: center ? "center" : "flex-start" }}><div style={{ width: w, height: 2, background: `linear-gradient(90deg, ${C.gold}, transparent)` }} /><Star s={12} /></div>;
}

function StarField() {
  const stars = useRef(Array.from({ length: 22 }, (_, i) => ({ id: i, x: Math.random()*100, y: Math.random()*100, sz: Math.random()*2+1, op: Math.random()*0.2+0.05, d: Math.random()*5 }))).current;
  return <div style={{ position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none" }}>{stars.map(s=><div key={s.id} style={{ position:"absolute",left:`${s.x}%`,top:`${s.y}%`,width:s.sz,height:s.sz,borderRadius:"50%",background:C.gold,opacity:s.op,animation:`tw ${3+s.d}s ease-in-out infinite alternate` }}/>)}<style>{`@keyframes tw{0%{opacity:0.05}100%{opacity:0.3}}`}</style></div>;
}

function Divider({ from, to, flip = false }) {
  return <div style={{ position:"relative",height:60,marginTop:-1,overflow:"hidden",background:to }}><svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ position:"absolute",top:0,width:"100%",height:"100%" }}><polygon points={flip?"0,60 1440,0 1440,60":"0,0 1440,60 0,60"} fill={from}/></svg></div>;
}

/* ═══════════════════════════════════════════
   CITY DATA
   ═══════════════════════════════════════════ */
const CITIES = {
  "costa-mesa": {
    name: "Costa Mesa", tagline: "The City of the Arts", hero: "Your VA Home Loan Partner in Costa Mesa",
    population: "113,000+", medianHome: "$1,050,000", county: "Orange County", zip: "92626, 92627, 92628",
    nearbyBases: "Joint Forces Training Base Los Alamitos (15 mi), Naval Weapons Station Seal Beach (18 mi)",
    veteranInfo: "Costa Mesa has a vibrant veteran community with dedicated city support services, partnering with Team Red White & Blue, Support The Enlisted Project (STEP), and Habitat for Humanity's Veterans Build. The Costa Mesa Veterans Memorial in Fairview Park honors local service members.",
    localHighlights: "Known as the 'City of the Arts,' Costa Mesa is home to South Coast Plaza and the Segerstrom Center for the Arts. The city offers urban convenience with coastal living, easy access to Newport and Huntington beaches, and central OC location ideal for commuters.",
    marketInsight: "Costa Mesa's market features diverse housing from condos to single-family homes across Mesa Verde, College Park, and Eastside. Its central location and coastal proximity drive fast sales. VA jumbo loans are frequently used here.",
    neighborhoods: ["Mesa Verde", "College Park", "South Coast Metro", "Eastside", "Westside"],
  },
  "huntington-beach": {
    name: "Huntington Beach", tagline: "Surf City USA", hero: "VA Home Loans for Huntington Beach Veterans",
    population: "198,000+", medianHome: "$1,200,000", county: "Orange County", zip: "92605, 92615, 92646–92649",
    nearbyBases: "Joint Forces Training Base Los Alamitos (10 mi), Naval Weapons Station Seal Beach (8 mi)",
    veteranInfo: "Huntington Beach has a strong military heritage with a significant veteran population. The city hosts annual Veterans Day ceremonies at Pier Plaza, maintains the HB Veterans Memorial, and has active VFW and American Legion posts supporting transitioning service members.",
    localHighlights: "Famous as 'Surf City USA' with 10 miles of coastline, a vibrant Main Street downtown, the iconic HB Pier, Pacific City for upscale shopping, and Bolsa Chica Ecological Reserve for stunning wetland nature trails.",
    marketInsight: "One of OC's most desirable coastal communities. Beachside homes command premium prices while inland neighborhoods are more accessible. VA jumbo loans are essential for most purchases. Homes often sell within 3–4 weeks.",
    neighborhoods: ["Downtown HB", "Huntington Harbour", "Seacliff", "Goldenwest", "Edwards Hill"],
  },
  "orange": {
    name: "Orange", tagline: "A City with Historic Charm", hero: "VA Home Loans in the Heart of Orange, CA",
    population: "140,000+", medianHome: "$950,000", county: "Orange County", zip: "92856, 92862, 92865–92869",
    nearbyBases: "Joint Forces Training Base Los Alamitos (18 mi), March Air Reserve Base (40 mi)",
    veteranInfo: "Home to Chapman University's strong military/veteran student program. Orange County's VA Healthcare System is headquartered nearby giving veterans convenient access to medical services. Active American Legion and VFW chapters serve the community.",
    localHighlights: "Beloved for historic Old Towne — a charming one-square-mile area around the Plaza filled with antique shops, restaurants, and beautifully preserved historic homes. Home to Chapman University and excellent school districts.",
    marketInsight: "Orange offers excellent value with options from Craftsman homes in Old Towne to newer developments in Orange Hills. Median prices are more accessible than coastal cities, making it ideal for standard VA purchase loans.",
    neighborhoods: ["Old Towne", "Orange Park Acres", "Orange Hills", "El Modena", "Killefer"],
  },
  "irvine": {
    name: "Irvine", tagline: "Master-Planned Excellence", hero: "VA Home Loan Solutions for Irvine Veterans",
    population: "310,000+", medianHome: "$1,580,000", county: "Orange County", zip: "92602–92620",
    nearbyBases: "Former MCAS El Toro (now Great Park), Joint Forces Training Base Los Alamitos (20 mi)",
    veteranInfo: "Irvine's Great Park was built on the former Marine Corps Air Station El Toro — the iconic balloon and veterans memorial honor this heritage. UC Irvine provides dedicated veteran student services and the OC Veterans Service Office is easily accessible.",
    localHighlights: "Consistently ranked among America's safest cities. A master-planned community with top-rated schools, extensive trails, the 1,300-acre Great Park, and a major tech hub home to Broadcom, Blizzard Entertainment, and numerous Fortune 500 offices.",
    marketInsight: "One of OC's priciest markets at ~$1.58M median. VA jumbo loans are essential. Highly competitive due to safety, schools, and quality of life. New developments in Great Park and Portola Springs offer modern options.",
    neighborhoods: ["Woodbury", "Portola Springs", "Turtle Rock", "University Park", "Great Park"],
  },
  "long-beach": {
    name: "Long Beach", tagline: "The International City", hero: "VA Home Loans for Long Beach Service Members",
    population: "466,000+", medianHome: "$830,000", county: "Los Angeles County", zip: "90802–90815",
    nearbyBases: "Naval Weapons Station Seal Beach (adjacent), Joint Forces Training Base Los Alamitos (8 mi), Coast Guard Base LA/LB",
    veteranInfo: "One of SoCal's largest veteran populations, adjacent to Naval Weapons Station Seal Beach and Coast Guard Base. The Long Beach VA Healthcare Center provides comprehensive services. The city's Veterans Day Parade is one of the oldest on the West Coast.",
    localHighlights: "A vibrant port city with stunning waterfront, the historic Queen Mary, thriving arts and dining in Belmont Shore, Naples, and East Village. Excellent transit via Metro, an international airport, and Shoreline Village along the harbor.",
    marketInsight: "One of the most accessible coastal SoCal markets at ~$830K median. Many veterans can use standard VA purchase loans without jumbo financing. Diverse options from beachfront condos to family homes in Bixby Knolls.",
    neighborhoods: ["Belmont Shore", "Naples", "Bixby Knolls", "Los Altos", "Signal Hill"],
  },
  "newport": {
    name: "Newport Beach", tagline: "Coastal Luxury Living", hero: "VA Home Loans for Newport Beach Veterans",
    population: "85,000+", medianHome: "$3,500,000", county: "Orange County", zip: "92657, 92660–92663",
    nearbyBases: "Joint Forces Training Base Los Alamitos (15 mi), Naval Weapons Station Seal Beach (18 mi)",
    veteranInfo: "Newport's affluent community includes many retired military officers and veterans settled along the coast. The OC Veterans Memorial in nearby Irvine serves the Newport veteran community, with local organizations providing networking and transition support.",
    localHighlights: "OC's premier coastal destination featuring the Balboa Peninsula and Pier, Fashion Island, Crystal Cove State Park, thousands of harbor boats, world-class dining, and Corona del Mar's stunning tide pools and bluffs.",
    marketInsight: "One of California's priciest markets at ~$3.5M median. VA jumbo loans are absolutely essential. Tim's deep jumbo expertise is critical here. Options range from harbor-view condos to oceanfront estates.",
    neighborhoods: ["Balboa Peninsula", "Corona del Mar", "Newport Coast", "Balboa Island", "Lido Isle"],
  },
  "santa-ana": {
    name: "Santa Ana", tagline: "The Heart of Orange County", hero: "VA Home Loans for Santa Ana Veterans",
    population: "310,000+", medianHome: "$800,000", county: "Orange County (County Seat)", zip: "92701–92707",
    nearbyBases: "Joint Forces Training Base Los Alamitos (12 mi), Naval Weapons Station Seal Beach (16 mi)",
    veteranInfo: "As the county seat, Santa Ana is home to the OC Veterans Service Office helping veterans access benefits and file claims. The Santa Ana VA Clinic provides local healthcare, and active VFW and American Legion chapters serve the community.",
    localHighlights: "The county seat and cultural heart of OC with the Bowers Museum, Discovery Cube, and a thriving downtown arts/dining scene on 4th Street. Excellent freeway access via the 5, 55, and 22 makes it a commuter-friendly hub.",
    marketInsight: "Among OC's most affordable markets at ~$800K median. Many veterans can purchase with a standard VA loan — no jumbo needed. Floral Park and Morrison Park offer charming homes while newer developments provide modern options.",
    neighborhoods: ["Floral Park", "Morrison Park", "Willard", "South Coast Metro", "Downtown"],
  },
  "san-clemente": {
    name: "San Clemente", tagline: "The Spanish Village by the Sea", hero: "VA Home Loans for San Clemente Military Families",
    population: "65,000+", medianHome: "$1,400,000", county: "Orange County", zip: "92672–92674",
    nearbyBases: "Marine Corps Base Camp Pendleton (adjacent — Gate 5 access)",
    veteranInfo: "The #1 off-base living choice for Camp Pendleton families, directly adjacent via Gate 5. Over 77,000 retired military reside within 50 miles of Pendleton. Military families are woven into the fabric of local schools, businesses, and civic life.",
    localHighlights: "Known as 'The Spanish Village by the Sea' with signature white stucco architecture, historic Avenida Del Mar downtown, the beloved San Clemente Pier, world-famous Trestles surf break, and tight-knit community events.",
    marketInsight: "Driven heavily by Camp Pendleton military families and veterans settling post-service. VA jumbo loans are common at the ~$1.4M median. Forster Ranch and Talega offer newer family developments while the Pier Bowl has charming coastal cottages.",
    neighborhoods: ["Forster Ranch", "Talega", "Pier Bowl", "T-Street", "Marblehead"],
  },
};

const PRODUCTS = [
  { id: "purchase", title: "VA Purchase Loans", icon: "home", brief: "Zero down payment, no PMI, competitive rates.", detail: "Buy your dream home with no money down and no private mortgage insurance. Tim handles everything from your Certificate of Eligibility to coordinating with local real estate agents through closing day." },
  { id: "irrrl", title: "VA IRRRL (Streamline Refinance)", icon: "trend", brief: "Lower your rate fast with minimal paperwork.", detail: "Already have a VA loan? The Interest Rate Reduction Refinance Loan is one of the fastest ways to lower your monthly payment — minimal documentation, often no appraisal required." },
  { id: "cashout", title: "VA Cash-Out Refinance", icon: "dollar", brief: "Tap your home equity for any purpose.", detail: "Access the equity you've built for renovations, debt consolidation, education, or any other financial need. Tim ensures this option fits your long-term goals." },
  { id: "jumbo", title: "VA Jumbo Loans", icon: "shield", brief: "Finance high-value properties with VA benefits.", detail: "For homes exceeding standard conforming limits — critical in Orange County's premium markets. Enjoy VA benefits even on higher-priced properties." },
];

/* ═══════════════════════════════════════════
   NAVBAR — integrated with page routing
   ═══════════════════════════════════════════ */
function Navbar({ page, setPage, scrolled }) {
  const [mob, setMob] = useState(false);

  const handleNav = (target) => {
    setMob(false);
    if (target === "locations") {
      setPage("locations");
      return;
    }
    if (target === "home") {
      setPage("home");
      return;
    }
    // If we're on locations page, go home first then scroll
    if (page !== "home") {
      setPage("home");
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const links = [
    { label: "About", target: "about" },
    { label: "Meet Tim", target: "tim" },
    { label: "Products", target: "products" },
    { label: "Service Areas", target: "locations" },
    { label: "Why Us", target: "why" },
    { label: "Contact", target: "contact" },
  ];

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(10,22,40,0.97)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? `1px solid ${C.navyLight}` : "1px solid transparent", transition: "all 0.3s", padding: scrolled ? "12px 0" : "20px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => handleNav("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <Shield s={30} />
          <div>
            <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18, fontWeight: 700, color: C.white, lineHeight: 1.1, textAlign: "left" }}>The Joy of Lending</div>
            <div style={{ fontSize: 10, color: C.gold, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>VA Home Loans</div>
          </div>
        </button>
        <div className="dNav" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {links.map(l => (
            <button key={l.target} onClick={() => handleNav(l.target)} style={{
              background: "none", border: "none", cursor: "pointer", textDecoration: "none",
              color: (page === "locations" && l.target === "locations") ? C.gold : C.muted,
              fontSize: 14, fontFamily: "'DM Sans',sans-serif", letterSpacing: 0.5, transition: "color 0.2s", padding: 0,
            }}
              onMouseEnter={e => e.target.style.color = C.gold}
              onMouseLeave={e => e.target.style.color = (page === "locations" && l.target === "locations") ? C.gold : C.muted}
            >{l.label}</button>
          ))}
          <button onClick={() => handleNav("contact")} style={{ textDecoration: "none", padding: "10px 22px", background: C.red, color: C.white, borderRadius: 6, fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", transition: "background 0.2s", border: "none", cursor: "pointer" }}
            onMouseEnter={e => e.target.style.background = C.redLight}
            onMouseLeave={e => e.target.style.background = C.red}>
            Get Started
          </button>
        </div>
        <button className="mBtn" onClick={() => setMob(!mob)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "none" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.white} strokeWidth="2">{mob ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}</svg>
        </button>
      </div>
      {mob && <div className="mMenu" style={{ background: C.navy, padding: "16px 24px", borderTop: `1px solid ${C.navyLight}` }}>
        {links.map(l => <button key={l.target} onClick={() => handleNav(l.target)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 16, fontFamily: "'DM Sans',sans-serif", padding: "12px 0", borderBottom: `1px solid ${C.navyMid}` }}>{l.label}</button>)}
        <button onClick={() => handleNav("contact")} style={{ display: "inline-block", marginTop: 14, padding: "12px 28px", background: C.red, color: C.white, borderRadius: 6, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", border: "none", cursor: "pointer" }}>Get Started</button>
      </div>}
    </nav>
  );
}

/* ═══════════════════════════════════════════
   HOME PAGE SECTIONS
   ═══════════════════════════════════════════ */
function Hero() {
  const [ok, setOk] = useState(false);
  useEffect(() => { setTimeout(() => setOk(true), 100); }, []);
  const a = (d) => ({ opacity: ok ? 1 : 0, transform: ok ? "translateY(0)" : "translateY(28px)", transition: `all 0.7s ease ${d}s` });
  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", background: C.navy, overflow: "hidden" }}>
      {/* California Landscape — CSS painted scene */}
      <div style={{ position: "absolute", inset: 0 }}>
        {/* Sky gradient — California golden hour */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #0B1A2E 0%, #132B4A 25%, #1A3D6B 40%, #2C5F8A 55%, #4A7FA8 65%, #D4956B 80%, #E8A862 88%, #C97B4B 95%, #1A3355 100%)" }} />
        {/* Sun glow */}
        <div style={{ position: "absolute", bottom: "18%", right: "25%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,168,98,0.4) 0%, rgba(212,149,107,0.15) 40%, transparent 70%)" }} />
        {/* Ocean */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "22%" }}>
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ position: "absolute", bottom: 0, width: "100%", height: "100%" }}>
            <path d="M0,80 C240,40 480,120 720,80 C960,40 1200,100 1440,70 L1440,200 L0,200 Z" fill="#0D2240" opacity="0.9" />
            <path d="M0,110 C200,80 400,140 700,100 C1000,60 1200,120 1440,95 L1440,200 L0,200 Z" fill="#091A33" opacity="0.95" />
            <path d="M0,140 C300,120 600,160 900,130 C1100,110 1300,145 1440,125 L1440,200 L0,200 Z" fill="#07152B" />
          </svg>
          {/* Shimmer on water */}
          <div style={{ position: "absolute", bottom: "30%", left: "30%", width: 200, height: 2, background: `linear-gradient(90deg, transparent, ${C.gold}30, transparent)`, borderRadius: 2 }} />
          <div style={{ position: "absolute", bottom: "40%", left: "45%", width: 120, height: 1.5, background: `linear-gradient(90deg, transparent, ${C.gold}20, transparent)`, borderRadius: 2 }} />
        </div>
        {/* Distant hills / California coastline silhouette */}
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" style={{ position: "absolute", bottom: "15%", width: "100%", height: "40%", opacity: 0.6 }}>
          <path d="M0,300 C100,250 200,280 350,220 C500,160 550,190 700,170 C850,150 950,200 1100,160 C1200,130 1350,180 1440,150 L1440,400 L0,400 Z" fill="#0F2035" />
        </svg>
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" style={{ position: "absolute", bottom: "12%", width: "100%", height: "35%", opacity: 0.4 }}>
          <path d="M0,320 C150,280 300,300 500,250 C700,200 800,260 1000,220 C1150,190 1300,240 1440,200 L1440,400 L0,400 Z" fill="#0A1828" />
        </svg>
        {/* Palm tree silhouettes */}
        <svg viewBox="0 0 100 200" style={{ position: "absolute", bottom: "18%", left: "8%", width: 60, height: 120, opacity: 0.35 }}>
          <line x1="50" y1="200" x2="48" y2="60" stroke="#051020" strokeWidth="4" />
          <path d="M48,60 C30,50 15,30 5,45 C20,35 35,45 48,60 Z" fill="#051020" />
          <path d="M48,60 C65,45 85,30 90,50 C75,35 60,48 48,60 Z" fill="#051020" />
          <path d="M48,60 C40,35 35,10 25,20 C35,15 42,35 48,60 Z" fill="#051020" />
          <path d="M48,60 C55,30 65,5 75,15 C65,10 55,35 48,60 Z" fill="#051020" />
          <path d="M48,60 C48,30 50,5 55,10 C50,8 48,35 48,60 Z" fill="#051020" />
        </svg>
        <svg viewBox="0 0 100 200" style={{ position: "absolute", bottom: "20%", left: "3%", width: 45, height: 90, opacity: 0.25 }}>
          <line x1="50" y1="200" x2="52" y2="70" stroke="#051020" strokeWidth="5" />
          <path d="M52,70 C35,58 18,40 10,55 C25,43 40,55 52,70 Z" fill="#051020" />
          <path d="M52,70 C68,55 88,42 92,60 C78,48 62,58 52,70 Z" fill="#051020" />
          <path d="M52,70 C45,42 42,15 32,28 C40,22 46,45 52,70 Z" fill="#051020" />
          <path d="M52,70 C58,38 68,12 76,22 C68,16 58,42 52,70 Z" fill="#051020" />
        </svg>
        <svg viewBox="0 0 100 200" style={{ position: "absolute", bottom: "17%", right: "12%", width: 50, height: 100, opacity: 0.2 }}>
          <line x1="50" y1="200" x2="49" y2="65" stroke="#051020" strokeWidth="4" />
          <path d="M49,65 C32,52 15,35 8,50 C22,38 38,50 49,65 Z" fill="#051020" />
          <path d="M49,65 C65,50 82,38 88,55 C74,42 58,52 49,65 Z" fill="#051020" />
          <path d="M49,65 C43,38 38,10 28,22 C36,16 44,40 49,65 Z" fill="#051020" />
          <path d="M49,65 C55,35 62,8 72,18 C64,12 56,38 49,65 Z" fill="#051020" />
        </svg>
        {/* Overall dark overlay for text readability */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.35) 50%, rgba(10,22,40,0.5) 100%)" }} />
      </div>
      <StarField />
      <div style={{ position: "absolute", right: -80, top: "50%", transform: "translateY(-50%)", opacity: 0.03 }}><Shield s={500} /></div>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", width: "100%" }}>
        <div style={{ maxWidth: 680 }}>
          <div style={{ ...a(0.2), display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", background: `${C.gold}15`, border: `1px solid ${C.gold}30`, borderRadius: 100, marginBottom: 28 }}>
            <Star s={14} />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.gold, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Proudly Serving California Veterans</span>
          </div>
          <h1 style={{ ...a(0.4), fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(36px,5.5vw,66px)", fontWeight: 700, color: C.white, lineHeight: 1.1, margin: "0 0 24px" }}>
            Honoring Your Service <span style={{ color: C.gold }}>With the Home</span> You Deserve
          </h1>
          <p style={{ ...a(0.6), fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(16px,2vw,20px)", color: C.muted, lineHeight: 1.7, maxWidth: 540, margin: "0 0 40px" }}>
            California's dedicated VA home loan specialists. Zero down payment, no PMI, and expert guidance from pre-qualification to closing day.
          </p>
          <div style={{ ...a(0.8), display: "flex", flexWrap: "wrap", gap: 16 }}>
            <a href="#contact" style={{ textDecoration: "none", padding: "16px 36px", background: C.red, color: C.white, borderRadius: 8, fontSize: 16, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", transition: "all 0.25s", boxShadow: `0 4px 20px ${C.red}40` }} onMouseEnter={e => { e.currentTarget.style.background = C.redLight; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.transform = "translateY(0)"; }}>Talk to Tim Today</a>
            <a href="#products" style={{ textDecoration: "none", padding: "16px 36px", background: "transparent", color: C.gold, borderRadius: 8, fontSize: 16, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", border: `1px solid ${C.gold}40`, transition: "all 0.25s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.background = `${C.gold}10`; }} onMouseLeave={e => { e.currentTarget.style.borderColor = `${C.gold}40`; e.currentTarget.style.background = "transparent"; }}>Explore VA Loans</a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 40, marginTop: 60, opacity: ok ? 1 : 0, transition: "opacity 0.7s ease 1.2s" }}>
            {[["5,000+","Veterans Served"],["$0","Down Payment"],["$0","PMI Required"]].map(([n, l]) => (
              <div key={l}><div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 28, fontWeight: 700, color: C.gold }}>{n}</div><div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: C.muted, letterSpacing: 1, textTransform: "uppercase", marginTop: 4 }}>{l}</div></div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
    </section>
  );
}

function About() {
  const benefits = ["Zero down payment on home purchases","No private mortgage insurance (PMI) ever","Competitive, below-market interest rates","Backed by the U.S. Department of Veterans Affairs","Serving all of California — every county, every community"];
  return (
    <section id="about" style={{ background: C.cream, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal><div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.red, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>About Us</span>
          <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: C.navy, margin: "12px 0 0", lineHeight: 1.2 }}>Dedicated Exclusively to Those Who Served</h2>
          <GoldRule w={80} center />
        </div></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
          <Reveal delay={0.15}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: C.navyMid, lineHeight: 1.8 }}>
              <p style={{ margin: "0 0 20px" }}>At the heart of our mission is a deep commitment to the men and women who have served our nation. We are a California-based mortgage company specializing <strong>exclusively</strong> in VA home loan products.</p>
              <p style={{ margin: 0 }}>Our company was founded on the belief that those who have sacrificed for our country deserve access to the very best home financing options available.</p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {benefits.map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: C.white, borderRadius: 10, border: `1px solid ${C.gold}20`, boxShadow: "0 2px 10px rgba(10,22,40,0.03)" }}>
                  <div style={{ flexShrink: 0, width: 34, height: 34, borderRadius: "50%", background: `${C.gold}12`, display: "flex", alignItems: "center", justifyContent: "center" }}><Check /></div>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: C.navyMid, fontWeight: 500 }}>{b}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MeetTim() {
  return (
    <section id="tim" style={{ background: C.navy, padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <StarField />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60, alignItems: "center" }}>
          <Reveal>
            <div style={{ width: "100%", maxWidth: 360, borderRadius: 16, overflow: "hidden", border: `2px solid ${C.gold}25`, margin: "0 auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
              <img src={TIM_PHOTO} alt="Tim — VA Home Loan Expert" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.red, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>Your VA Loan Expert</span>
            <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: C.white, margin: "12px 0 0", lineHeight: 1.2 }}>Meet Tim</h2>
            <GoldRule />
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: C.muted, lineHeight: 1.8, margin: "20px 0" }}>Leading our team is Tim, a recognized expert in VA home loans who has built his career around serving the California veteran community. His extensive knowledge and genuine passion have made him one of the most sought-after VA loan specialists in the state.</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: C.muted, lineHeight: 1.8, margin: "0 0 32px" }}>Tim has guided thousands of California veterans through the entire VA home loan process — from pre-qualification to closing day.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
              {[["15+","Years Experience"],["5,000+","Veterans Helped"],["58","CA Counties Served"]].map(([n, l]) => (
                <div key={l} style={{ padding: "16px 22px", background: `${C.gold}08`, border: `1px solid ${C.gold}18`, borderRadius: 10 }}>
                  <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 24, fontWeight: 700, color: C.gold }}>{n}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.muted, letterSpacing: 1, textTransform: "uppercase", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function HomeProducts() {
  const [active, setActive] = useState(null);
  const prods = [
    { icon: <Home2 s={32} />, title: "VA Purchase Loans", brief: "Buy your home with zero down payment and no PMI.", detail: "Our flagship product helps eligible veterans buy a home with no down payment, no private mortgage insurance, and favorable interest rates. Tim handles the entire process." },
    { icon: <Trend s={32} />, title: "VA IRRRL", sub: "Streamline Refinance", brief: "Lower your rate fast with minimal paperwork.", detail: "The VA IRRRL is one of the fastest ways for veterans with an existing VA loan to lower their interest rate. Minimal documentation, often no appraisal, significant monthly savings." },
    { icon: <Dollar s={32} />, title: "VA Cash-Out Refinance", brief: "Access your home equity for any financial need.", detail: "Refinance your existing mortgage and withdraw cash for home improvements, debt consolidation, education expenses, or any other financial need." },
    { icon: <Shield s={32} />, title: "VA Jumbo Loans", brief: "Finance high-value California properties with VA benefits.", detail: "California's high-cost markets often require amounts exceeding conforming limits. Our VA jumbo program lets eligible veterans finance higher-priced properties with VA benefits." },
  ];
  return (
    <section id="products" style={{ background: C.cream, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal><div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.red, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>Our Products</span>
          <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: C.navy, margin: "12px 0 0", lineHeight: 1.2 }}>VA Loan Solutions Tailored to You</h2>
          <GoldRule w={80} center />
        </div></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
          {prods.map((p, i) => {
            const open = active === i;
            return (
              <Reveal key={i} delay={i * 0.1}>
                <div onClick={() => setActive(open ? null : i)} style={{ background: open ? C.navy : C.white, borderRadius: 14, padding: 28, cursor: "pointer", border: `1px solid ${open ? C.gold+"40" : C.gold+"12"}`, transition: "all 0.35s", boxShadow: open ? "0 12px 40px rgba(10,22,40,0.15)" : "0 2px 12px rgba(10,22,40,0.04)", transform: open ? "translateY(-4px)" : "translateY(0)", minHeight: 200, display: "flex", flexDirection: "column" }}
                  onMouseEnter={e => { if(!open) e.currentTarget.style.transform="translateY(-4px)"; }}
                  onMouseLeave={e => { if(!open) e.currentTarget.style.transform="translateY(0)"; }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 12, background: open ? `${C.gold}15` : `${C.navy}08`, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>{p.icon}</div>
                    <div style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}><ChevDown c={open ? C.gold : C.navyLight} /></div>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, fontWeight: 700, color: open ? C.white : C.navy, margin: "0 0 4px", transition: "color 0.3s" }}>{p.title}</h3>
                  {p.sub && <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: open ? C.gold : C.muted, fontWeight: 500 }}>{p.sub}</span>}
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, margin: "12px 0 0", color: open ? C.muted : "#5A6B82", lineHeight: 1.6, transition: "color 0.3s" }}>{open ? p.detail : p.brief}</p>
                  {open && <div style={{ marginTop: "auto", paddingTop: 20 }}><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600, color: C.gold }}>Learn More →</span></div>}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const reasons = [
    { t: "Exclusive VA Focus", d: "Every member of our team speaks the language of VA lending fluently. We don't dabble — this is all we do." },
    { t: "California Market Experts", d: "From San Diego to Sacramento, we understand the nuances of California's diverse and competitive real estate landscape." },
    { t: "Statewide Service", d: "We proudly serve veterans throughout all 58 California counties — Los Angeles, San Francisco, and every community in between." },
    { t: "Personalized Attention", d: "Tim brings unmatched expertise and personal care to every transaction, guiding you from pre-qualification through closing." },
  ];
  return (
    <section id="why" style={{ background: C.navy, padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <StarField />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal><div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.red, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>Why Choose Us</span>
          <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: C.white, margin: "12px 0 0", lineHeight: 1.2 }}>True VA Loan Expertise Makes the Difference</h2>
          <GoldRule w={80} center />
        </div></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {reasons.map((r, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div style={{ padding: 32, borderRadius: 14, background: `linear-gradient(135deg,${C.navyMid},${C.navyLight}20)`, border: `1px solid ${C.gold}12`, transition: "all 0.3s", height: "100%" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=`${C.gold}40`; e.currentTarget.style.transform="translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=`${C.gold}12`; e.currentTarget.style.transform="translateY(0)"; }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>{[0,1,2].map(j=><Star key={j} s={14}/>)}</div>
                <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, fontWeight: 700, color: C.white, margin: "0 0 12px" }}>{r.t}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.7, margin: 0 }}>{r.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [done, setDone] = useState(false);
  const inp = { width: "100%", padding: "14px 18px", borderRadius: 8, border: `1px solid ${C.gold}20`, background: C.white, fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: C.navy, outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" };
  return (
    <section id="contact" style={{ background: C.cream, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60 }}>
          <Reveal>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.red, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>Get In Touch</span>
            <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: C.navy, margin: "12px 0 0", lineHeight: 1.2 }}>Ready to Explore Your VA Loan Options?</h2>
            <GoldRule />
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: "#5A6B82", lineHeight: 1.8, margin: "20px 0 36px" }}>Tim and our dedicated team are here to guide you every step of the way.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                [<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>, "(555) 123-4567"],
                [<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, "tim@joyoflending.com"],
                [<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, "Serving All of California"],
              ].map(([icon, text], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${C.navy}08`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: C.navy, fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            {done ? (
              <div style={{ background: C.white, borderRadius: 16, padding: 48, textAlign: "center", border: `1px solid ${C.gold}20` }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: `${C.gold}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}><Check s={32} /></div>
                <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 24, color: C.navy, margin: "0 0 12px" }}>Thank You!</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: "#5A6B82", margin: 0 }}>Tim will be in touch shortly.</p>
              </div>
            ) : (
              <div style={{ background: C.white, borderRadius: 16, padding: "36px 32px", border: `1px solid ${C.gold}20`, boxShadow: "0 4px 20px rgba(10,22,40,0.06)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {[["Full Name","text","name","John Smith"],["Email","email","email","john@example.com"],["Phone","tel","phone","(555) 000-0000"]].map(([label,type,key,ph]) => (
                    <div key={key}><label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: C.navyMid, fontWeight: 600, marginBottom: 6, display: "block" }}>{label}</label><input type={type} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} placeholder={ph} style={inp} onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=`${C.gold}20`}/></div>
                  ))}
                  <div><label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: C.navyMid, fontWeight: 600, marginBottom: 6, display: "block" }}>Message</label><textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us about your VA loan needs..." rows={4} style={{...inp,resize:"vertical"}} onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=`${C.gold}20`}/></div>
                  <button onClick={()=>setDone(true)} style={{ width:"100%",padding:16,background:C.red,color:C.white,border:"none",borderRadius:8,fontFamily:"'DM Sans',sans-serif",fontSize:16,fontWeight:600,cursor:"pointer",transition:"all 0.25s",boxShadow:`0 4px 16px ${C.red}30` }}
                    onMouseEnter={e=>{e.target.style.background=C.redLight;e.target.style.transform="translateY(-2px)";}}
                    onMouseLeave={e=>{e.target.style.background=C.red;e.target.style.transform="translateY(0)";}}>Send Message</button>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: C.navy, padding: "48px 24px 32px", borderTop: `1px solid ${C.navyLight}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Shield s={24} />
            <div><div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 16, fontWeight: 700, color: C.white }}>The Joy of Lending</div><div style={{ fontSize: 10, color: C.gold, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>VA Home Loans</div></div>
          </div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.muted, margin: 0 }}>© 2026 The Joy of Lending. All rights reserved. NMLS# 000000</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   LOCATIONS PAGE
   ═══════════════════════════════════════════ */
function LocationsPage({ setPage }) {
  const [currentCity, setCurrentCity] = useState(null);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const cityKeys = Object.keys(CITIES);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [currentCity]);

  /* ─── City Selector ─── */
  if (!currentCity) {
    return (
      <div>
        <div style={{ background: `linear-gradient(160deg, ${C.navy} 0%, ${C.navyMid} 50%, ${C.navyLight} 100%)`, padding: "120px 24px 70px", position: "relative", overflow: "hidden" }}>
          <StarField />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: `${C.gold}12`, border: `1px solid ${C.gold}25`, borderRadius: 100, marginBottom: 20 }}>
              <MapPin s={14} c={C.gold} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.gold, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Southern California Locations</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(30px,5vw,52px)", fontWeight: 700, color: C.white, lineHeight: 1.15, margin: "0 0 16px" }}>
              VA Home Loans Across <span style={{ color: C.gold }}>Southern California</span>
            </h1>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, color: C.muted, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              Select your city to explore local VA home loan options, market insights, and how Tim can help you.
            </p>
            <GoldRule w={80} center />
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 24 }}>
            {cityKeys.map((key, i) => {
              const city = CITIES[key];
              return (
                <Reveal key={key} delay={i * 0.06}>
                  <div onClick={() => setCurrentCity(key)} style={{ background: C.white, borderRadius: 14, padding: 28, cursor: "pointer", border: `1px solid ${C.gold}15`, transition: "all 0.3s", boxShadow: "0 2px 12px rgba(10,22,40,0.04)" }}
                    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow="0 12px 36px rgba(10,22,40,0.1)"; e.currentTarget.style.borderColor=`${C.gold}40`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 12px rgba(10,22,40,0.04)"; e.currentTarget.style.borderColor=`${C.gold}15`; }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: `${C.navy}08`, display: "flex", alignItems: "center", justifyContent: "center" }}><MapPin s={20} c={C.red} /></div>
                      <div>
                        <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, fontWeight: 700, color: C.navy, margin: 0 }}>{city.name}</h3>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.muted, fontStyle: "italic" }}>{city.tagline}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 20, marginBottom: 14 }}>
                      <div><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1 }}>Median Home</span><div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18, fontWeight: 700, color: C.gold }}>{city.medianHome}</div></div>
                      <div><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1 }}>Pop.</span><div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18, fontWeight: 700, color: C.navy }}>{city.population}</div></div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: C.red }}>Explore VA Loans <Arrow s={14} c={C.red} /></div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  /* ─── City Detail ─── */
  const city = CITIES[currentCity];
  const cityIdx = cityKeys.indexOf(currentCity);
  const prevCity = cityIdx > 0 ? cityKeys[cityIdx - 1] : null;
  const nextCity = cityIdx < cityKeys.length - 1 ? cityKeys[cityIdx + 1] : null;

  return (
    <div>
      {/* Hero */}
      <section style={{ background: `linear-gradient(160deg, ${C.navy} 0%, ${C.navyMid} 50%, ${C.navyLight} 100%)`, padding: "120px 24px 70px", position: "relative", overflow: "hidden" }}>
        <StarField />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>
          <button onClick={() => setCurrentCity(null)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 24, fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: C.gold, padding: 0 }}>
            <Arrow s={14} c={C.gold} dir="left" /> All Locations
          </button>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: `${C.gold}12`, border: `1px solid ${C.gold}25`, borderRadius: 100, marginBottom: 20 }}>
            <MapPin s={14} c={C.gold} />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.gold, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>{city.county} · {city.tagline}</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(30px,5vw,54px)", fontWeight: 700, color: C.white, lineHeight: 1.15, margin: "0 0 16px", maxWidth: 700 }}>{city.hero}</h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, color: C.muted, lineHeight: 1.7, maxWidth: 600, margin: "0 0 32px" }}>Tim and our team specialize in helping {city.name} veterans navigate the VA loan process with expert, personalized guidance.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 28 }}>
            {[["Median Home", city.medianHome], ["Population", city.population], ["ZIP Codes", city.zip.split(",").length + " zones"]].map(([l, v]) => (
              <div key={l}><div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 26, fontWeight: 700, color: C.gold }}>{v}</div><div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.muted, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>{l}</div></div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
      </section>

      {/* About City */}
      <section style={{ padding: "80px 24px", background: C.cream }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
              <div>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.red, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>About {city.name}</span>
                <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 700, color: C.navy, margin: "10px 0 0", lineHeight: 1.2 }}>Living in {city.name}</h2>
                <GoldRule />
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: C.navyMid, lineHeight: 1.8, margin: "16px 0" }}>{city.localHighlights}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                  {city.neighborhoods.map(n => <span key={n} style={{ padding: "6px 14px", background: `${C.navy}08`, borderRadius: 100, fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: C.navyMid, fontWeight: 500 }}>{n}</span>)}
                </div>
              </div>
              <div>
                <div style={{ background: C.white, borderRadius: 14, padding: 28, border: `1px solid ${C.gold}15` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}><Shield s={22} c={C.red} /><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18, fontWeight: 700, color: C.navy, margin: 0 }}>Veteran Community</h3></div>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: C.navyMid, lineHeight: 1.8, margin: "0 0 16px" }}>{city.veteranInfo}</p>
                  <div style={{ padding: "14px 18px", background: `${C.gold}08`, borderRadius: 10, border: `1px solid ${C.gold}15` }}>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.muted, textTransform: "uppercase", letterSpacing: 1 }}>Nearby Military Installations</span>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: C.navy, fontWeight: 500, marginTop: 4 }}>{city.nearbyBases}</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Market Insight */}
      <section style={{ background: C.navy, padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        <StarField />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.red, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>Market Insight</span>
            <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 700, color: C.white, margin: "10px 0 0", lineHeight: 1.2 }}>{city.name} Housing Market</h2>
            <GoldRule />
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: C.muted, lineHeight: 1.8, margin: "16px 0 32px", maxWidth: 800 }}>{city.marketInsight}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
              {[["Median Price", city.medianHome],["$0 Down","VA Benefit"],["$0 PMI","VA Benefit"],["County", city.county]].map(([l, v], i) => (
                <div key={i} style={{ padding: "22px 20px", background: `${C.gold}08`, border: `1px solid ${C.gold}15`, borderRadius: 12 }}>
                  <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 22, fontWeight: 700, color: C.gold }}>{v}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.muted, letterSpacing: 1, textTransform: "uppercase", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Products */}
      <section style={{ padding: "80px 24px", background: C.cream }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.red, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>VA Loan Products</span>
            <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 700, color: C.navy, margin: "10px 0 0", lineHeight: 1.2 }}>VA Loan Options for {city.name}</h2>
            <GoldRule w={80} center />
          </div></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
            {PRODUCTS.map((p, i) => {
              const open = expandedProduct === p.id;
              const medianNum = parseInt(city.medianHome.replace(/[$,]/g, ""));
              const jumboRelevant = p.id === "jumbo" && medianNum > 1000000;
              return (
                <Reveal key={p.id} delay={i * 0.08}>
                  <div onClick={() => setExpandedProduct(open ? null : p.id)} style={{ background: open ? C.navy : C.white, borderRadius: 14, padding: 26, cursor: "pointer", border: `1px solid ${open ? C.gold+"35" : C.gold+"12"}`, transition: "all 0.3s", boxShadow: open ? "0 10px 36px rgba(10,22,40,0.12)" : "0 2px 10px rgba(10,22,40,0.03)", display: "flex", flexDirection: "column", minHeight: 180 }}
                    onMouseEnter={e => { if(!open) e.currentTarget.style.transform="translateY(-4px)"; }}
                    onMouseLeave={e => { if(!open) e.currentTarget.style.transform="translateY(0)"; }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                      <div style={{ width: 50, height: 50, borderRadius: 10, background: open ? `${C.gold}15` : `${C.navy}06`, display: "flex", alignItems: "center", justifyContent: "center" }}><ProductIcon type={p.icon} s={26} c={open ? C.gold : C.navy} /></div>
                      {jumboRelevant && <span style={{ padding: "4px 10px", background: `${C.red}15`, borderRadius: 100, fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.red, fontWeight: 600 }}>Recommended</span>}
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18, fontWeight: 700, color: open ? C.white : C.navy, margin: "0 0 8px", transition: "color 0.3s" }}>{p.title}</h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: open ? C.muted : "#5A6B82", lineHeight: 1.65, margin: 0 }}>{open ? p.detail : p.brief}</p>
                    {open && <div style={{ marginTop: "auto", paddingTop: 16, fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: C.gold }}>Talk to Tim about this →</div>}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: C.navy, padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        <StarField />
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>{[0,1,2].map(i=><Star key={i} s={18}/>)}</div>
            <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(26px,4vw,42px)", fontWeight: 700, color: C.white, lineHeight: 1.2, margin: "0 0 16px" }}>Ready to Buy a Home in {city.name}?</h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: C.muted, lineHeight: 1.7, margin: "0 0 32px" }}>Get expert VA loan guidance tailored to the {city.name} market.</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
              <a href="tel:5551234567" style={{ textDecoration: "none", padding: "16px 36px", background: C.red, color: C.white, borderRadius: 8, fontSize: 16, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", boxShadow: `0 4px 20px ${C.red}40`, transition: "all 0.25s" }}
                onMouseEnter={e=>{e.currentTarget.style.background=C.redLight;e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.background=C.red;e.currentTarget.style.transform="translateY(0)";}}>Call Tim: (555) 123-4567</a>
              <a href="mailto:tim@joyoflending.com" style={{ textDecoration: "none", padding: "16px 36px", background: "transparent", color: C.gold, borderRadius: 8, fontSize: 16, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", border: `1px solid ${C.gold}40`, transition: "all 0.25s" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.background=`${C.gold}10`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=`${C.gold}40`;e.currentTarget.style.background="transparent";}}>Email Tim</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* City Nav */}
      <section style={{ background: C.cream, padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          {prevCity ? (
            <button onClick={() => { setCurrentCity(prevCity); setExpandedProduct(null); }} style={{ background: "none", border: `1px solid ${C.gold}25`, borderRadius: 8, padding: "12px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=C.gold} onMouseLeave={e=>e.currentTarget.style.borderColor=`${C.gold}25`}>
              <Arrow s={14} c={C.navy} dir="left" /><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600, color: C.navy }}>{CITIES[prevCity].name}</span>
            </button>
          ) : <div />}
          <button onClick={() => { setCurrentCity(null); setExpandedProduct(null); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: C.muted, display: "flex", alignItems: "center", gap: 6 }}>
            <MapPin s={14} c={C.muted} /> View All Cities
          </button>
          {nextCity ? (
            <button onClick={() => { setCurrentCity(nextCity); setExpandedProduct(null); }} style={{ background: "none", border: `1px solid ${C.gold}25`, borderRadius: 8, padding: "12px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=C.gold} onMouseLeave={e=>e.currentTarget.style.borderColor=`${C.gold}25`}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600, color: C.navy }}>{CITIES[nextCity].name}</span><Arrow s={14} c={C.navy} />
            </button>
          ) : <div />}
        </div>
      </section>
      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP — page router
   ═══════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div style={{ margin: 0, padding: 0, background: C.cream, minHeight: "100vh" }}>
      <Navbar page={page} setPage={setPage} scrolled={scrolled || page === "locations"} />

      {page === "home" && (
        <>
          <Hero />
          <Divider from={C.navyLight} to={C.cream} />
          <About />
          <Divider from={C.cream} to={C.navy} flip />
          <MeetTim />
          <Divider from={C.navy} to={C.cream} />
          <HomeProducts />
          <Divider from={C.cream} to={C.navy} flip />
          <WhyUs />
          <Divider from={C.navy} to={C.cream} />
          <Contact />
          <Divider from={C.cream} to={C.navy} flip />
          <Footer />
        </>
      )}

      {page === "locations" && (
        <LocationsPage setPage={setPage} />
      )}
    </div>
  );
}
