let element = $('.widget-abc123');
let data = {
	device: 'desktop', //desktop, tablet, mobile
	inEditor: true,
	siteId: '',
	elementId: '',
	config: {
		sampleList: [{}],
		sample:''
	}
};

let device = data.device;
let sampleList = data.config.sampleList;
let sample = data.config.sample;

let noCollectMessage = 'No data was found.' ///data.config.noCollectMessage
let noCollectSubMessage = 'This will be hidden on preview and live site.' ///data.config.noCollectSubMessage
let sampleListData;

switch (device) {
	case 'desktop':
		$(element).width("960px");
		break;
	case 'tablet':
		$(element).width("875px");
		break;
	default:
		$(element).width("326px");
}

//ADD MULTIPLE LINK SOURCE HERE


dmAPI.runOnReady('init', function () {
	dmAPI.loadScript('PLUGIN LINK', function () {

		if (sampleListData.length == 0) {

			if (data.inEditor) {
				$(element).html(`<div class="widget-noCollection-Title">${noCollectMessage}</div><div class="widget-noCollection-Subtext">${noCollectSubMessage}</div>`)
			} else {
				$(element).hide()
			}
			return

		} else {
			
			setTimeout(preloader(), 2000)
		}

	})
})
