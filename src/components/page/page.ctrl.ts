
export default class PageCtrl {

	private tinymceOptions: any;

	constructor(private $scope: any) {
		this.$scope = $scope;
		this.$scope.tinymceOptions = {
			onChange: function(e) {
				// put logic here for keypress and cut/paste changes
			},
			inline: false,
			plugins : 'advlist autolink link image lists charmap print preview textcolor visualblocks code',
			toolbar: 'forecolor backcolor undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image code',
			skin: 'lightgray',
			theme : 'modern',
			file_browser_callback: (field_name, url, type, win) => {
				var filebrowser = "filebrowser.php";
				//filebrowser += (filebrowser.indexOf("?") < 0) ? "?type=" + type : "&type=" + type;
				/*window.tinymce.activeEditor.windowManager.open({
					title : "Insertar fichero",
					width : 520,
					height : 400,
					//	url : filebrowser
				}, {
					window : win,
					input : field_name
				});*/
				return false;
			},
			file_browser_callback_types: 'file image media'
		};
		this.tinymceOptions = this.$scope.tinymceOptions;
	}
}
