<template>
    <div>
        <input id="settings-collapsible" class="toggle hidden" type=checkbox>
        <label for="settings-collapsible" class="label-toggle relative text-center text-gray-300 hover:text-white cursor-pointer font-medium text-lg xl:text-xl">
            Filtres
            <span class="toggle-plus text-xl ml-1 text-yellow-400">+</span>
            <span class="toggle-minus text-xl ml-1 text-yellow-400 hidden">-</span>
        </label>
        <div class="settings-container max-h-0 overflow-hidden xl:mt-4 ml-4 xl:ml-8">
            <div class="settings">
                <div class="settings-langages mb-2">
                    <h3 class="text-white xl:text-lg mb-1 xl:mb-2 ml-2">Langues</h3>
                    <div class="flex flex-wrap">
                        <label class="custom-box relative cursor-pointer select-none pl-6 text-white text-sm mr-2 ml-2">
                            Français
                            <input
                                value="fr"
                                v-model="selectedLangages"
                                @change="updateLangage"
                                class="hidden"
                                type="checkbox"
                            >
                            <span class="checkmark absolute top-0 left-0 h-4 w-4 bg-gray-700 rounded-sm"></span>
                        </label>
                        <label class="custom-box relative cursor-pointer select-none pl-6 text-white text-sm mr-2 ml-2">
                            Anglais
                            <input
                                value="us"
                                v-model="selectedLangages"
                                @change="updateLangage"
                                class="hidden"
                                type="checkbox"
                            >
                            <span class="checkmark absolute top-0 left-0 h-4 w-4 bg-gray-700 rounded-sm"></span>
                        </label>
                    </div>
                </div>
                <div class="settings-teams mb-2">
                    <h3 class="text-white xl:text-lg mb-1 xl:mb-2 ml-2">Teams</h3>
                    <div class="flex flex-wrap">
                        <label
                            v-for="team in teams"
                            :key="team.id"
                            class="custom-box relative cursor-pointer select-none pl-6 text-white text-sm mr-2 ml-2"
                        >
                            {{ team.name }}
                            <input
                                :value="team.name"
                                v-model="selectedTeams"
                                @change="updateTeam"
                                class="hidden"
                                type="checkbox"
                            >
                            <span class="checkmark absolute top-0 left-0 h-4 w-4 bg-gray-700 rounded-sm"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Settings',
    props: [
        'teams'
    ],
    data() {
        return {
            selectedLangages: ["fr", "us"],
            selectedTeams: []
        }
    },
    created() {
        this.$emit('langages', this.selectedLangages)
    },
    methods: {
        updateLangage: function() {
            this.$emit('langages', this.selectedLangages);
        },
        updateTeam: function() {
            this.$emit('teams', this.selectedTeams);
        }
    },
    watch: {
        teams: function() {
            this.selectedTeams = [];
            this.teams.forEach((team) => this.selectedTeams.push(team.name));
            this.$emit('teams', this.selectedTeams);
        }
    }
}

</script>

<style lang="scss">

.toggle:checked + .label-toggle + .settings-container {
  max-height: 100vh;
}

.label-toggle {
    transition: all 0.2s ease-in-out;
    &:before,
    &:after {
        content: "";
        position: absolute;
        bottom: -5px;
        width: 0px;
        height: 2px;
        margin: 2px 0 0;
        transition: all 0.2s ease-in-out;;
        transition-duration: 0.25s;
        opacity: 0;
        background-color: rgba(251, 191, 36, 1);
        left: 0;
    }
    &:hover {
        &:before,
        &:after {
            width: 100%;
            opacity: 1;
        }
    }
}

.toggle:checked + .label-toggle .toggle-plus {
    display: none;
}

.toggle:checked + .label-toggle .toggle-minus {
    display: inline;
}

.custom-box:hover .checkmark {
    background-color: rgba(107, 114, 128, 1);
}

.custom-box input:checked + .checkmark {
    background-color: rgba(251, 191, 36, 1);
}

.custom-box .checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.custom-box input:checked + .checkmark:after {
    display: block;
}

.custom-box .checkmark:after {
    left: 6px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}

</style>