import { Pie,Doughnut ,Line,Bar} from 'react-chartjs-2';
import { Chart , ArcElement, Tooltip, Legend,Title,CategoryScale,LinearScale,PointElement,LineElement,BarElement } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend,Title,CategoryScale,LinearScale,PointElement,LineElement,BarElement);
Chart.defaults.color = 'rgba(231, 227, 252, 0.87)';
Chart.defaults.borderColor = 'rgba(231, 227, 252, 0.87)';
export default function Chartjs(props) {
    const data = {
        labels: props.keywords.map(item => item.keyword),
        datasets: [
          {
            data: props.keywords.map(item => item.count),
            backgroundColor: ['#51087E','#514864' , '#880ED4', '#A020F0','#B24BF3','#C576F6','#D7A1F9','#3C3549','#514864','#6C0BA9','#675B7F'],
            hoverBackgroundColor: ['#D7A1F9', '#D7A1F9', '#D7A1F9', '#D7A1F9'],

          },
        ],
      };
      const data4 = {
        labels: props.authors.map(item => item.author_name),
        datasets: [
          {
            data: props.authors.map(item => item.count),
            backgroundColor: ['#51087E','#514864', '#880ED4', '#A020F0','#B24BF3','#C576F6','#D7A1F9','#3C3549','#6C0BA9','#675B7F'],
            hoverBackgroundColor: ['#D7A1F9', '#D7A1F9', '#D7A1F9', '#D7A1F9'],
            label: 'Auteurs/Articles',
          },
        ],
      };
      const data2 = {
        labels: props.journals.map(item => item.journal_name),
        datasets: [
          {
            data: props.keywords.map(item => item.count),
            backgroundColor: ['#51087E', '#6C0BA9', '#880ED4', '#A020F0','#B24BF3','#C576F6','#D7A1F9','#3C3549','#514864','#675B7F'],
            hoverBackgroundColor: ['#D7A1F9', '#D7A1F9', '#D7A1F9', '#D7A1F9'],
          },
        ],
      };    
      const data3 = {
        labels: props.years.map(item => item.publication_year),
        datasets: [
          {
            data: props.years.map(item => item.item_count),
            backgroundColor: ['#51087E', '#6C0BA9', '#880ED4', '#A020F0','#B24BF3','#C576F6','#D7A1F9','#3C3549','#514864','#675B7F'],
            hoverBackgroundColor: ['#D7A1F9', '#D7A1F9', '#D7A1F9', '#D7A1F9'],
            borderColor: 'rgb(255, 159, 67)',
            label: 'Articles/Years',  
            tension: 0.3,
            borderWidth:5,
            
        },
        ],
      };
      // Configuration du graphique
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            enabled: true
       },
       borderWidth:1,
        plugins: {
            legend: {
                labels: {
                    font: {
                      size: 15
                    },
                  },
                position: 'right',
                usePointStyle:true,
                margin: 10, 
              },

        }
    }
    const options2 = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            enabled: true
       },
       borderWidth:1,
        plugins: {
            legend: {
                labels: {
                    font: {
                      size: 10
                    },
                  },
                position: 'right',
                usePointStyle:true,
                margin: 10, 
              },

        }
    }
    const options3 = {
        scales: {
            // to remove the labels
            x: {
 
              // to remove the x-axis grid
              grid: {
                drawBorder: true,
                display: true,
                color:"rgba(231, 227, 252, 0.38)",
                width:"1px"
              },
            },
            // to remove the y-axis labels
            y: {
   
              // to remove the y-axis grid
              grid: {
                drawBorder: true,
                display: true,
                color:"rgba(231, 227, 252, 0.38)",
                width:"1px"
              },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            enabled: true
       },
       borderWidth:1,
        plugins: {
            legend: {
                labels: {
                    font: {
                      size: 10
                    },
                  },
                position: 'right',
                usePointStyle:true,
                margin: 10, 
              },

        }
    }
    const options4 = {
        scales: {
            // to remove the labels
            x: {
 
              // to remove the x-axis grid
              grid: {
                drawBorder: true,
                display: true,
                color:"rgba(231, 227, 252, 0.38)",
                width:"1px"
              },
            },
            // to remove the y-axis labels
            y: {
   
              // to remove the y-axis grid
              grid: {
                drawBorder: true,
                display: true,
                color:"rgba(231, 227, 252, 0.38)",
                width:"1px"
              },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            enabled: true
       },
       borderWidth:1,
        plugins: {
            legend: {
                labels: {
                    font: {
                      size: 10
                    },
                  },
                position: 'right',
                usePointStyle:true,
                margin: 10, 
              },

        }
    }
    return(
<>
        <div style={{margin:"5vh auto 5vh",position:"relative",width:"92vw",height:"45vh",padding:"5vh 5vh 14vh",border:"1px solid rgba(231, 227, 252, 0.12)",borderRadius:"6px",textAlign:"left"}}>
        <h2 style={{color:"rgba(231, 227, 252, 0.87)",marginBottom:"1vh"}}>Évolution du Nombre d'Articles par Année</h2>
        <h3 style={{color:"rgba(231, 227, 252, 0.38)",marginBottom:"3vh"}}>2015-2023</h3>
<Line    data={data3} options={options3} />
</div>
<div style={{margin:"5vh auto 5vh",position:"relative",width:"92vw",height:"45vh",padding:"5vh 5vh 14vh",border:"1px solid rgba(231, 227, 252, 0.12)",borderRadius:"6px",textAlign:"left"}}>
        <h2 style={{color:"rgba(231, 227, 252, 0.87)",marginBottom:"1vh"}}>Production d'Articles par Auteur : Analyse de la Distribution</h2>
<Bar    data={data4} options={options4} />
</div>

        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
        <div style={{position:"relative",width:"43vw",height:"45vh",padding:"5vh 5vh 14vh",border:"1px solid rgba(231, 227, 252, 0.12)",borderRadius:"6px",textAlign:"left"}}>
         <h2 style={{color:"rgba(231, 227, 252, 0.87)",marginBottom:"3vh"}}>Distribution du Nombre d'Articles par Journal</h2>
<Doughnut    data={data2} options={options2} />
</div>
        <div style={{position:"relative",width:"43vw",height:"45vh",padding:"5vh 5vh 14vh",border:"1px solid rgba(231, 227, 252, 0.12)",borderRadius:"6px",textAlign:"left"}}>
        <h2 style={{color:"rgba(231, 227, 252, 0.87)",marginBottom:"3vh"}}>Répartition des Mots-Clés les Plus Fréquents</h2>
<Pie    data={data} options={options} />
</div>
</div>
</>
    )
    }