Events.on(ClientLoadEvent, () => {
    let dialog = new BaseDialog("Texture Manager");
    dialog.addCloseButton();
    let sprites = require("sprites");

    Object.keys(sprites).forEach(sprite => {
        dialog.cont.pane(p1 => {
            p1.button(sprite, new TextureRegionDrawable(Core.atlas.find(sprite)), () => {
                let selectionDialog = new BaseDialog(sprite);
                selectionDialog.addCloseButton();
                selectionDialog.cont.pane(p2 => {
                    p2.cont.button("Default", Icon.star, () => {
                        Core.atlas.find(sprite).set(Core.atlas.find(sprite));
                    }).width(200);
                    p2.row();

                    sprites[sprite].forEach(spr => {
                        selectionDialog.cont.button(spr, new TextureRegionDrawable(Core.atlas.find(spr)), () => {
                            Core.atlas.find(sprite).set(Core.atlas.find(spr));
                        }).width(200);
                        p2.row();
                    });
                });
                selectionDialog.show();
            }).width(200);
            p1.row();
        });
    });

    Vars.ui.settings.shown(() => {
        Vars.ui.settings.children.get(1).children.get(0).children.get(0).row();
        Vars.ui.settings.children.get(1).children.get(0).children.get(0).button("Texture Manager",
            Styles.cleart,
            () => {
                dialog.show();
            });
    });
});