
const registracijaForma = document.getElementById("registracija-forma");

if (registracijaForma) {

    registracijaForma.addEventListener("submit", function(event) {

        event.preventDefault();

        let korisnickoIme = document.getElementById("korisnicko_ime").value;
        let email = document.getElementById("email").value;
        let zaporka = document.getElementById("zaporka").value;
        let zaporkaOpet = document.getElementById("zaporka_opet").value;

        let poruka = document.getElementById("poruka");

        if (zaporka !== zaporkaOpet) {
            poruka.textContent = "Zaporke se ne podudaraju!";
            return;
        }

        let korisnici = JSON.parse(localStorage.getItem("korisnici")) || [];

        for (let korisnik of korisnici) {

            if (korisnik.email === email) {
                poruka.textContent = "Korisnik s ovim emailom već postoji!";
                return;
            }
        }

        let noviKorisnik = {
            korisnickoIme: korisnickoIme,
            email: email,
            zaporka: zaporka
        };

        korisnici.push(noviKorisnik);

        localStorage.setItem("korisnici", JSON.stringify(korisnici));

        poruka.textContent = "Uspješna registracija!";

        registracijaForma.reset();

    });
}

const prijavaForma = document.getElementById("prijava-forma");

if (prijavaForma) {

    prijavaForma.addEventListener("submit", function(event) {

        event.preventDefault();

        let email = document.getElementById("email").value;
        let zaporka = document.getElementById("zaporka").value;

        let poruka = document.getElementById("poruka");

        let korisnici = JSON.parse(localStorage.getItem("korisnici")) || [];

        let pronadeniKorisnik = korisnici.find(function(korisnik) {

            return korisnik.email === email &&
                   korisnik.zaporka === zaporka;

        });

        if (pronadeniKorisnik) {

            sessionStorage.setItem(
                "prijavljeniKorisnik",
                JSON.stringify(pronadeniKorisnik)
            );

            window.location.href = "home.html";

        } else {

            poruka.textContent = "Pogrešan email ili zaporka!";

        }

    });
}