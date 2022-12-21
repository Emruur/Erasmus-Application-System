<script setup lang="ts">
import { LinkType } from '~~/ui-types/types';

</script>

<template>
    <NavbarOutgoing active="Documents"/>
    <div class="container-sm d-flex flex-column">
        <DocUploadCard cardType='Host Signed La' cardCode="hs-la" class="mt-2" />
        <DocUploadCard cardType="Host Acceptance Letter " cardCode="ha-l" class="mt-2" />
        <DocUploadCard cardType="InsuranceDocument" cardCode="id" class="mt-2" />
        <DocUploadCard cardType="Euro Account Info" cardCode="ea-i" class="mt-2" />
        <DocGrantApproval cardType="Grant Agreement" cardCode="ega" class="mt-2"/>
        <DocGrantDeclaration cardType="Grant declaration" cardCode="egd" class="mt-2 mb-2"/>
    </div>
</template>

