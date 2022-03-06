
export default function useStats(){
	
	async function addToClicks(eventName){
		// ajouter une API qui s'occupera des cliques
		console.log("L'événement " + eventName + " a été ajouté au banque de statistiques")
	}


	return {
		addToClicks
	}
}