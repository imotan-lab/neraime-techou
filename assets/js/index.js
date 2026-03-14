
async function renderMachines(){
  const mount=document.getElementById('machineGrid');
  if(!mount)return;
  try{
    const res=await fetch('assets/data/machines.json');
    const machines=await res.json();
    mount.innerHTML=machines.map(machine=>{
      if(machine.mode==='integrated'){
        return `
          <article class="machine-card">
            <div>
              <div class="machine-name">${machine.name}</div>
              <div class="machine-sub">${machine.sub}</div>
            </div>
            <div class="machine-links">
              <a class="btn btn-main" href="${machine.url}">この機種を見る</a>
            </div>
          </article>`;
      }
      return `
        <article class="machine-card">
          <div>
            <div class="machine-name">${machine.name}</div>
            <div class="machine-sub">${machine.sub}</div>
          </div>
          <div class="machine-links">
            <a class="btn btn-main" href="${machine.article}">記事を見る</a>
            <a class="btn btn-sub" href="${machine.checker}">チェッカー</a>
          </div>
        </article>`;
    }).join('');
    const count=document.getElementById('machineCount');
    if(count) count.textContent=`掲載数: ${machines.length}機種`;
  }catch(error){
    mount.innerHTML='<div class="empty-state">機種一覧を読み込めませんでした。assets/data/machines.json のパスをご確認ください。</div>';
  }
}

document.addEventListener('DOMContentLoaded',renderMachines);
