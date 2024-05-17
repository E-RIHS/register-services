<script setup>

</script>

<template>
    <footer class="container m-4 xl:mx-64 py-4">
        <Divider />

        <div class="grid grid-cols-2 gap-2 w-full">
            <div class="row-span-3">
                <img src="@/assets/e-rihs-logo.png" alt="E-RIHS IP" class="object-contain object-left h-12 w-65 " />
            </div>
            <div>
                <div class="flex flex-row w-full gap-3">
                    <div class="content-center text-[7px] text-right w-3/4">
                        E-RIHS IP has received funding from the European Union’s Horizon Europe<br/> 
                        call HORIZON-INFRA-2021-DEV-02, Grant Agreement n.101079148.
                    </div>
                    <div class="w-fit">
                        <a href="https://doi.org/10.3030/101079148" target="_blank">
                            <img src="@/assets/eu-fundedby-logo.png" alt="Funded by EU" class="object-contain object-left h-7 w-24" />
                        </a>
                    </div>
                </div>
            </div>
            <div>
                <div class="flex flex-row w-full gap-3">
                    <div class="content-center text-[7px] text-right w-3/4">
                        Developed by Wim Fremout / KIK-IRPA (Brussels) for E-RIHS
                    </div>
                    <div class="w-fit">
                        <a href="https://www.kikirpa.be" target="_blank">
                            <img src="@/assets/kikirpa-logo.png" alt="KIK-IRPA" class="object-contain object-left h-7 w-24" />
                        </a>
                    </div>
                </div>
            </div>
            <div>
                <div class="flex flex-row w-full gap-3">
                    <div class="content-center text-[7px] text-right align-[2px] w-3/4">
                        Source code available on GitHub under the MIT License
                    </div>
                    <div class="w-fit">
                        <a href="https://github.com/E-RIHS/register-services" target="_blank">
                            <img src="@/assets/github-mark.png" alt="GitHub" class="object-contain object-left h-5 w-24" />
                        </a>
                    </div>
                </div>
            </div>
        </div>

    </footer>
</template>