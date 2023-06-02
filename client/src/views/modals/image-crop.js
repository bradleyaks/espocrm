/************************************************************************
 * This file is part of EspoCRM.
 *
 * EspoCRM - Open Source CRM application.
 * Copyright (C) 2014-2023 Yurii Kuznietsov, Taras Machyshyn, Oleksii Avramenko
 * Website: https://www.espocrm.com
 *
 * EspoCRM is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * EspoCRM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with EspoCRM. If not, see http://www.gnu.org/licenses/.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "EspoCRM" word.
 ************************************************************************/

define('views/modals/image-crop', ['views/modal'], function (Dep) {

    return Dep.extend({

        cssName: 'image-crop',

        template: 'modals/image-crop',

        events: {
            'click [data-action="zoomIn"]': function () {
                this.$img.cropper('zoom', 0.1);
            },
            'click [data-action="zoomOut"]': function () {
                this.$img.cropper('zoom', -0.1);
            },
        },

        setup: function () {
            this.buttonList = [
                {
                    name: 'crop',
                    label: 'Submit',
                    style: 'primary',
                },
                {
                    name: 'cancel',
                    label: 'Cancel',
                },
            ];

            this.wait(Espo.loader.requirePromise('lib!Cropper'));

            this.on('remove', () => {
                if (this.$img.length) {
                    this.$img.cropper('destroy');
                    this.$img.parent().empty();
                }
            });
        },

        afterRender: function () {
            let $img = this.$img = $('<img>')
                .attr('src', this.options.contents)
                .addClass('hidden');

            this.$el.find('.image-container').append($img);

            setTimeout(() => {
                $img.cropper({
                    aspectRatio: 1,
                    movable: true,
                    resizable: true,
                    rotatable: false,
                });
            }, 50);
        },

        actionCrop: function () {
            var dataUrl = this.$img.cropper('getDataURL', 'image/jpeg');
            this.trigger('crop', dataUrl);
            this.close();
        },
    });
});
