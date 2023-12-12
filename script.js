document.addEventListener("DOMContentLoaded", function () {
    let calcular = document.getElementById("a");
    const ERROR = document.getElementById("error");
    let right = document.getElementById("right");
    let resultado1 = document.getElementById("resultado1");
    let resultado2 = document.getElementById("resultado2");
    let resultado3 = document.getElementById("resultado3");
    let instruccionesCalculo = document.getElementById("instruccionesCalculo");
    let metodoCalculo = document.getElementById("metodoCalculo");

    calcular.addEventListener("click", () => {
        let dato = document.getElementById("peso");

        if (dato.value === "" || dato.value <= 0) {
            ERROR.style.display = "block";
            ERROR.style.color = "#fc436c";
            limpiarResultados();
            // Ocultar #right en caso de error
            right.style.display = "none";
            return;
        }

        ERROR.style.display = "none";
        // Mostrar #right solo cuando no hay error
        right.style.display = "flex";

        let peso = parseFloat(dato.value);

        let vol1 = 0;
        let vol2 = 0;
        let hb = 0;
        let metodo = "";

        if (peso > 30) {
            vol1 = superficieCorporal(peso) * 1500;
            vol2 = superficieCorporal(peso) * 2000;
            hb = vol1 / 24;
            metodo = "Método: Superficie Corporal";
            mostrarInstruccionesSuperficieCorporal();
        } else {
            vol1 = hollidaySegar(peso);
            hb = vol1 / 24;
            metodo = "Método: Holliday-Segar";
            mostrarInstruccionesHollidaySegar();
        }

        mostrarResultado(vol1, vol2, hb, metodo);

        if (window.matchMedia("(min-width: 600px)").matches) {
            right.style.width = "50vh";
        }
    });

    function hollidaySegar(peso) {
        if (peso <= 10) {
            hb = peso * 100;
        } else if (peso <= 20) {
            hb = 10 * 100 + (peso - 10) * 50;
        } else {
            hb = 10 * 100 + 10 * 50 + (peso - 20) * 20;
        }
        return hb;
    }

    function superficieCorporal(peso) {
        let sup = ((peso * 4) + 7) / (peso + 90);
        return sup;
    }

    function mostrarResultado(vol1, vol2, hb, metodo) {
        resultado1.textContent = `Volumen diario: ${Math.round(vol1)} cc`;

        if (metodo === "Método: Holliday-Segar") {
            resultado2.textContent = "";
        } else {
            resultado2.textContent = `Volumen diario (opcional): ${Math.round(vol2)} cc`;
        }

        resultado3.innerHTML = `Mantenimiento: ${Math.round(hb)} cc/hr`;
        let divMmasM2 = document.createElement("div");
        divMmasM2.textContent = `m+m/2: ${Math.round(hb * 1.5)} cc/hr`;
        divMmasM2.classList.add("mmas-m2");
        resultado3.appendChild(divMmasM2);

        metodoCalculo.textContent = metodo;
    }

    function mostrarInstruccionesHollidaySegar() {
        instruccionesCalculo.innerHTML = `
            <h1>¿Cómo se calcula?</h1>
            <ul>
                <li>De 0kg a 10kg, se calcula 100cc por cada kilo</li>
                <li>Se suman 50cc por cada kilo de peso por arriba de 10kg, hasta 20kg</li>
                <li>De 20kg para arriba, se suman 20cc por cada kilo adicional</li>
            </ul>
        `;
    }

    function mostrarInstruccionesSuperficieCorporal() {
        instruccionesCalculo.innerHTML = `
            <h1>¿Cómo se calcula?</h1>
            <p>Superficie corporal = ( (peso * 4) + 7) / (peso + 90)</p>
            <p>Este resultado se multiplica por 1500 o por 2000 para hallar el valor del volumen diario en cc, y el médico decide cuál de los dos resultados utilizar.</p>
        `;
    }

    function limpiarResultados() {
        resultado1.textContent = "";
        resultado2.textContent = "";
        resultado3.textContent = "";
        metodoCalculo.textContent = "";
        instruccionesCalculo.innerHTML = "";
    }
});
